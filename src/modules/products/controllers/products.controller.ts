import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from '@modules/products/products.service';
import { HttpResponse } from '@common/http-responses/http.response';
import { GetProductsDto } from '@modules/products/dto/get-products.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getActiveProducts(
    @Query() getProductsDto: GetProductsDto,
  ): Promise<HttpResponse<any>> {
    const data = await this.productsService.getActiveProducts(getProductsDto);

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Products got successfully',
    };
  }
}
