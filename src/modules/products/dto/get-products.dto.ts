import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetProductsDto extends PaginationQueryDto {
  @ApiProperty({ required: false, default: 'false' })
  @Transform(({ value }) => value === 'true')
  onlyOutstandings: boolean;

  @ApiProperty({ required: false, default: '' })
  @IsOptional()
  @IsString()
  categories: string;
}
