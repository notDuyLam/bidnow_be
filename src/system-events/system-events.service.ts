import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemEvent } from '../entities/system-event.entity';
import { CreateSystemEventDto } from './dtos/create-system-event.dto';

@Injectable()
export class SystemEventsService {
  constructor(@InjectRepository(SystemEvent) private readonly repo: Repository<SystemEvent>) {}

  create(dto: CreateSystemEventDto) {
    const entity = this.repo.create({
      actorUserId: dto.actorUserId ?? null,
      action: dto.action,
      entityType: dto.entityType,
      entityId: dto.entityId,
      meta: dto.meta ?? {},
    });
    return this.repo.save(entity);
  }

  listByEntity(entityType: string, entityId: string) {
    return this.repo.find({ where: { entityType, entityId }, order: { createdAt: 'DESC' } });
  }
}


