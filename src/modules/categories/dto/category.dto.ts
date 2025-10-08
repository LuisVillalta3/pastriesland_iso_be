import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, description: 'Category name' })
  name: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  isActive: boolean;
}
