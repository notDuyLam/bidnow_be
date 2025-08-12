import { IsBoolean, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBidDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  auctionId!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  amountCents!: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  minIncrementCents?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isProxy?: boolean;
}


