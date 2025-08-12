import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { CreateSessionDto } from './dtos/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(@InjectRepository(Session) private readonly repo: Repository<Session>) {}

  create(dto: CreateSessionDto) {
    const entity = this.repo.create({
      userId: dto.userId,
      refreshTokenHash: dto.refreshTokenHash ?? null,
      userAgent: dto.userAgent ?? null,
      ip: dto.ip ?? null,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
    });
    return this.repo.save(entity);
  }

  async getById(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Session not found');
    return found;
  }

  async revoke(id: string) {
    const found = await this.getById(id);
    await this.repo.remove(found);
    return { id };
  }
}


