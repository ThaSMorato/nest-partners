import { Injectable } from '@nestjs/common'
import { Prisma, SpotStatus } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { CreateEventDto } from './dto/create-event.dto'
import { ReserveSpotDTO } from './dto/reserve-spot.dto'
import { UpdateEventDto } from './dto/update-event.dto'

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    })
  }

  findAll() {
    return this.prisma.event.findMany()
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    })
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    })
  }

  remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    })
  }

  async reserveSpot(dto: ReserveSpotDTO, id: string) {
    const spots = await this.prisma.spot.findMany({
      where: {
        name: {
          in: dto.spots,
        },
        eventId: id,
      },
    })

    if (spots.length !== dto.spots.length) {
      const foundSpotsName = spots.map((spot) => spot.name)
      const notFoundSpotNames = dto.spots.filter(
        (spotName) => !foundSpotsName.includes(spotName),
      )
      throw new Error(`Spots ${notFoundSpotNames.join(', ')} not found`)
    }

    try {
      const tickets = this.prisma.$transaction(async (prisma) => {
        await prisma.reservationHistory.createMany({
          data: spots.map((spot) => ({
            spotId: spot.id,
            ticketKind: dto.ticketKind,
            status: 'RESERVED',
            email: dto.email,
          })),
        })

        await prisma.spot.updateMany({
          where: {
            id: {
              in: spots.map((spot) => spot.id),
            },
          },
          data: {
            status: SpotStatus.RESERVED,
          },
        })

        const tickets = await Promise.all(
          spots.map((spot) => {
            return prisma.ticket.create({
              data: {
                email: dto.email,
                ticketKind: dto.ticketKind,
                spotId: spot.id,
              },
            })
          }),
        )

        return tickets
      })

      return tickets
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
          case 'P2034':
            throw new Error('Some spots are already reserved')
        }
      }
      throw e
    }
  }
}
