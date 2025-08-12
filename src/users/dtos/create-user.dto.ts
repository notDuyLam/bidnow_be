import { IsEmail, IsOptional, IsString, IsStrongPassword, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  email!: string;

  // @ApiProperty({ minLength: 8, description: 'At least 8 characters with a number' })
  @ApiProperty()
  @IsStrongPassword({ minLength: 1, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0 })
  password!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({ enum: ['USER', 'SELLER', 'ADMIN'] })
  @IsOptional()
  @IsIn(['USER', 'SELLER', 'ADMIN'])
  role?: 'USER' | 'SELLER' | 'ADMIN';
}


