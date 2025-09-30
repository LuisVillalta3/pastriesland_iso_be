import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, description: 'User email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'User first name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'User last name' })
  lastName: string;
}
