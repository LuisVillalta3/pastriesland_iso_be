import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from '@modules/auth/guards/admin.guard';
import { ProductsService } from '@modules/products/products.service';
import { CreateProductDto } from '@modules/products/dto/create-product.dto';
import { HttpResponse } from '@common/http-responses/http.response';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';
import { IdParamDto } from '@common/dto/id-param.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';

@Controller('admin/products')
@ApiTags('Products')
@UseGuards(AdminAuthGuard)
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query() query: PaginationQueryDto): Promise<HttpResponse<any>> {
    const data = await this.productsService.findAll(query);

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Products got successfully',
    };
  }

  @Get(':id')
  async findById(@Param() { id }: IdParamDto) {
    const data = await this.productsService.findById(id);

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Products found successfully',
    };
  }

  @Post()
  @ErrorHandler()
  async create(
    @Body() productDto: CreateProductDto,
  ): Promise<HttpResponse<any>> {
    const data = await this.productsService.create(productDto);

    return {
      statusCode: HttpStatus.CREATED,
      data,
      message: 'Product created successfully',
    };
  }

  @Put(':id')
  @ErrorHandler()
  async update(
    @Param() { id }: IdParamDto,
    @Body() productDto: CreateProductDto,
  ) {
    const data = await this.productsService.update(id, productDto);

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Product created successfully',
    };
  }

  @Delete(':id')
  @ErrorHandler()
  async delete(@Param() { id }: IdParamDto) {
    await this.productsService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Product deleted successfully',
    };
  }
}
