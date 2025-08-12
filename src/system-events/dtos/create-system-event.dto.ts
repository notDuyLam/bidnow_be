import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSystemEventDto {
  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  actorUserId?: string;

  @ApiProperty()
  @IsString()
  action!: string;

  @ApiProperty()
  @IsString()
  entityType!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  entityId!: string;

  // meta is arbitrary JSON; leave as unknown
  @ApiPropertyOptional({ description: 'Arbitrary JSON object' })
  @IsOptional()
  meta?: unknown;
}


