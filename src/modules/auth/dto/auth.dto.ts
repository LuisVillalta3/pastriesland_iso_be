import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, description: 'User email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'User password' })
  password: string;
}
