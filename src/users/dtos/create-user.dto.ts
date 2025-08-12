import { IsEmail, IsOptional, IsString, IsStrongPassword, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0 })
  password!: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsIn(['USER', 'SELLER', 'ADMIN'])
  role?: 'USER' | 'SELLER' | 'ADMIN';
}


