import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemEventsService } from './system-events.service';
import { CreateSystemEventDto } from './dtos/create-system-event.dto';

@ApiTags('SystemEvents')
@Controller('system-events')
export class SystemEventsController {
  constructor(private readonly service: SystemEventsService) {}

  @Post()
  create(@Body() dto: CreateSystemEventDto) {
    return this.service.create(dto);
  }

  @Get(':entityType/:entityId')
  listByEntity(@Param('entityType') entityType: string, @Param('entityId') entityId: string) {
    return this.service.listByEntity(entityType, entityId);
  }
}


