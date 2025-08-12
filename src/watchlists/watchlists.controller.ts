import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WatchlistsService } from './watchlists.service';
import { UpsertWatchlistDto } from './dtos/upsert-watchlist.dto';

@ApiTags('Watchlists')
@Controller('watchlists')
export class WatchlistsController {
  constructor(private readonly service: WatchlistsService) {}

  @Post()
  add(@Body() dto: UpsertWatchlistDto) {
    return this.service.add(dto);
  }

  @Delete(':userId/:auctionId')
  remove(@Param('userId') userId: string, @Param('auctionId') auctionId: string) {
    return this.service.remove(userId, auctionId);
  }

  @Get('user/:userId')
  listByUser(@Param('userId') userId: string) {
    return this.service.listByUser(userId);
  }
}


