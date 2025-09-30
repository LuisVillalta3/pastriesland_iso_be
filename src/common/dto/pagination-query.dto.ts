import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ required: false })
  paginated: boolean;

  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;
}
