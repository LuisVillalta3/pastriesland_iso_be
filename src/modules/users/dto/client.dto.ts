import { UserDto } from '@modules/users/dto/user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClientDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'User password' })
  password: string;
}
