import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from '../entities/auction.entity';
import { Item } from '../entities/item.entity';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Item])],
  providers: [AuctionsService],
  controllers: [AuctionsController],
  exports: [AuctionsService],
})
export class AuctionsModule {}


