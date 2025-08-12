import { IsDateString, IsIn, IsInt, IsOptional, IsPositive, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuctionDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  itemId!: string;

  @ApiPropertyOptional({ default: 'VND' })
  @IsOptional()
  @IsString()
  currency?: string; // default VND

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @IsPositive()
  startPriceCents!: number;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @IsPositive()
  minIncrementCents!: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  reservePriceCents?: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  buyNowPriceCents?: number;

  @ApiProperty({ format: 'date-time' })
  @IsDateString()
  startsAt!: string;

  @ApiProperty({ format: 'date-time' })
  @IsDateString()
  endsAt!: string;

  @ApiPropertyOptional({ enum: ['PENDING', 'LIVE', 'ENDED', 'CANCELLED'] })
  @IsOptional()
  @IsIn(['PENDING', 'LIVE', 'ENDED', 'CANCELLED'])
  status?: 'PENDING' | 'LIVE' | 'ENDED' | 'CANCELLED';

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  autoExtendSeconds?: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxExtensions?: number;
}


