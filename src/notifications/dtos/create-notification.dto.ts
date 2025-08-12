import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty()
  @IsString()
  type!: string;

  // payload is arbitrary JSON; leave as unknown
  @ApiProperty({ description: 'Arbitrary JSON object' })
  payload!: unknown;
}


