import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSchema {
  @ApiProperty()
  name: string;
}
