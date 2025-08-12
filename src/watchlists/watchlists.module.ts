import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from '../entities/watchlist.entity';
import { WatchlistsService } from './watchlists.service';
import { WatchlistsController } from './watchlists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist])],
  providers: [WatchlistsService],
  controllers: [WatchlistsController],
})
export class WatchlistsModule {}


