import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from '../entities/bid.entity';
import { Auction } from '../entities/auction.entity';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bid, Auction])],
  providers: [BidsService],
  controllers: [BidsController],
  exports: [BidsService],
})
export class BidsModule {}


