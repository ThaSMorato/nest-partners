import {
  CreateEventDto,
  EventsService,
  ReserveSpotDTO,
  UpdateEventDto,
} from '@app/core'
import { AuthGuard } from '@app/core/auth/auth.guard'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @HttpCode(201)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create({
      ...createEventDto,
      date: new Date(createEventDto.date),
    })
  }

  @Get()
  findAll() {
    return this.eventsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, {
      ...updateEventDto,
      date: new Date(updateEventDto.date),
    })
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id)
  }

  @UseGuards(AuthGuard)
  @Post(':id/reserve')
  reserveSpot(@Body() dto: ReserveSpotDTO, @Param('id') eventId: string) {
    return this.eventsService.reserveSpot(dto, eventId)
  }
}
