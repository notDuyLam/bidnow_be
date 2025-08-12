import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpsertWatchlistDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  auctionId!: string;
}


