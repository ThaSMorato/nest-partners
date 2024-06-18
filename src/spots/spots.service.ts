import { Injectable } from '@nestjs/common'
import { SpotStatus } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

import { CreateSpotDto } from './dto/create-spot.dto'
import { UpdateSpotDto } from './dto/update-spot.dto'

@Injectable()
export class SpotsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpotDto: CreateSpotDto, eventId: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    })

    if (!event) {
      throw new Error('Event doesnt exists')
    }

    return this.prisma.spot.create({
      data: {
        ...createSpotDto,
        eventId,
        status: SpotStatus.AVAILABLE,
      },
    })
  }

  findAll(eventId: string) {
    return this.prisma.spot.findMany({
      where: {
        eventId,
      },
    })
  }

  findOne(eventId: string, spotId: string) {
    return this.prisma.spot.findUnique({
      where: {
        eventId,
        id: spotId,
      },
    })
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prisma.spot.update({
      where: {
        eventId,
        id: spotId,
      },
      data: updateSpotDto,
    })
  }

  remove(eventId: string, spotId: string) {
    return this.prisma.spot.delete({
      where: {
        eventId,
        id: spotId,
      },
    })
  }
}
