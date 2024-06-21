import { CreateSpotDto, SpotsService, UpdateSpotDto } from '@app/core'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

@Controller('eventos/:eventId/lugares')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Body() createSpotDto: CreateSpotDto,
    @Param('eventId') eventId: string,
  ) {
    return this.spotsService.create(createSpotDto, eventId)
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId)
  }

  @Get(':spotId')
  findOne(@Param('spotId') spotId: string, @Param('eventId') eventId: string) {
    return this.spotsService.findOne(eventId, spotId)
  }

  @Patch(':spotId')
  update(
    @Param('spotId') spotId: string,
    @Body() updateSpotDto: UpdateSpotDto,
    @Param('eventId') eventId: string,
  ) {
    return this.spotsService.update(eventId, spotId, updateSpotDto)
  }

  @Delete(':spotId')
  remove(@Param('spotId') spotId: string, @Param('eventId') eventId: string) {
    return this.spotsService.remove(eventId, spotId)
  }
}
