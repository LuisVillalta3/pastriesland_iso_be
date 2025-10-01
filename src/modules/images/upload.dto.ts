import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageableType: string;

  @ApiProperty()
  imageId?: string | number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageableId: string;
}
