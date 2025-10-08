import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ProductVariantType } from '@modules/products/entities/product-variant.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsCurrency()
  basePrice: string;

  @ApiProperty()
  @IsBoolean()
  isComplement: boolean;

  @ApiProperty()
  @IsNumber()
  units: number;

  @ApiProperty()
  @IsNumber()
  minPortions: number;

  @ApiProperty()
  @IsNumber()
  maxPortions: number;

  @ApiProperty()
  categoriesIDs: string[];

  @ApiProperty()
  variants?: VariantDto[];

  @ApiProperty({ default: true })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ default: true })
  @IsBoolean()
  isOutstanding: boolean;

  @ApiProperty()
  @IsString()
  addons: string;

  @ApiProperty()
  @IsString()
  flavors: string;

  @ApiProperty()
  @IsString()
  design: string;
}

export class VariantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsCurrency()
  price: string;

  @ApiProperty()
  @IsPositive()
  portions: number;

  @ApiProperty()
  @IsString()
  type: ProductVariantType;
}
