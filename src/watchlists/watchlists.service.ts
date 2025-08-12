import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from '../entities/watchlist.entity';
import { UpsertWatchlistDto } from './dtos/upsert-watchlist.dto';

@Injectable()
export class WatchlistsService {
  constructor(@InjectRepository(Watchlist) private readonly repo: Repository<Watchlist>) {}

  async add(dto: UpsertWatchlistDto) {
    const entity = this.repo.create({ userId: dto.userId, auctionId: dto.auctionId });
    return this.repo.save(entity);
  }

  async remove(userId: string, auctionId: string) {
    await this.repo.delete({ userId, auctionId });
    return { userId, auctionId };
  }

  listByUser(userId: string) {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }
}


