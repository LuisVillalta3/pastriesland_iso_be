import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsDecimal, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsCurrency()
  @IsNotEmpty()
  total: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  items: CreateOrderItemDto[];

  @ApiProperty({ default: '', nullable: true })
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  paymentMethod: 'card' | 'cash';
}

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDecimal()
  basePrice: string;

  @ApiProperty({ default: '', nullable: true })
  addons: string;

  @ApiProperty({ default: '', nullable: true })
  flavors: string;

  @ApiProperty({ default: '', nullable: true })
  design: string;
}
