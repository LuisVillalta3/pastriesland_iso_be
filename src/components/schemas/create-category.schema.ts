import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorySchema {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  id: string;
}
