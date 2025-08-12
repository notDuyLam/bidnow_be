import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dtos/create-bid.dto';

@ApiTags('Bids')
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  place(@Body() dto: CreateBidDto) {
    return this.bidsService.place(dto);
  }

  @Get('auction/:auctionId')
  listByAuction(@Param('auctionId') auctionId: string) {
    return this.bidsService.listByAuction(auctionId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.bidsService.getById(id);
  }
}


