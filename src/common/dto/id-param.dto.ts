import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID()
  @ApiProperty()
  id: string;
}
