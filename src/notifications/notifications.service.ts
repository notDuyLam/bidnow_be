import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  create(dto: CreateNotificationDto) {
    const entity = this.repo.create({
      userId: dto.userId,
      type: dto.type,
      payload: dto.payload,
      readAt: null,
    });
    return this.repo.save(entity);
  }

  list(userId?: string) {
    if (userId) return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async markRead(id: string) {
    const n = await this.repo.findOne({ where: { id } });
    if (!n) throw new NotFoundException('Notification not found');
    n.readAt = new Date();
    return this.repo.save(n);
  }
}


