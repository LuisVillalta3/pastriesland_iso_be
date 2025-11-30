import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  message: string;
}
