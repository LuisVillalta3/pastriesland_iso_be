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
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CategoriesService } from '@modules/categories/categories.service';
import { CategoryDto } from '@modules/categories/dto/category.dto';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';
import { CreateCategorySchema } from '@/components/schemas/create-category.schema';
import { HttpResponse } from '@common/http-responses/http.response';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { AdminAuthGuard } from '@modules/auth/guards/admin.guard';
import { IdParamDto } from '@common/dto/id-param.dto';

@Controller('admin/categories')
@ApiTags('Categories')
@UseGuards(AdminAuthGuard)
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiExtraModels(CreateCategorySchema)
  @ApiOkResponse({
    description: 'Get categories',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'Category' },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(CreateCategorySchema),
          },
        },
      },
    },
  })
  async getAll(@Query() query: PaginationQueryDto): Promise<HttpResponse<any>> {
    const data = await this.categoriesService.findAll(query);

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Category got successfully',
    };
  }

  @Post()
  @ApiExtraModels(CreateCategorySchema)
  @ApiCreatedResponse({
    description: 'Category created successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.CREATED },
        message: { type: 'string', example: 'Admin created successfully' },
        data: {
          $ref: getSchemaPath(CreateCategorySchema),
        },
      },
    },
  })
  @ErrorHandler()
  async create(
    @Body() categoryDto: CategoryDto,
  ): Promise<HttpResponse<CreateCategorySchema>> {
    const category = await this.categoriesService.create(categoryDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: category,
      message: 'Category created successfully',
    };
  }

  @Put(':id')
  @ApiExtraModels(CreateCategorySchema)
  @ApiCreatedResponse({
    description: 'Category created successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.CREATED },
        message: { type: 'string', example: 'Admin created successfully' },
        data: {
          $ref: getSchemaPath(CreateCategorySchema),
        },
      },
    },
  })
  @ErrorHandler()
  async update(
    @Param() { id }: IdParamDto,
    @Body() categoryDto: CategoryDto,
  ): Promise<HttpResponse<CreateCategorySchema>> {
    const category = await this.categoriesService.update(id, categoryDto);

    return {
      statusCode: HttpStatus.OK,
      data: category,
      message: 'Category updated successfully',
    };
  }

  @Get(':id')
  @ApiExtraModels(CreateCategorySchema)
  @ApiCreatedResponse({
    description: 'Category created successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.CREATED },
        message: { type: 'string', example: 'Admin created successfully' },
        data: {
          $ref: getSchemaPath(CreateCategorySchema),
        },
      },
    },
  })
  @ErrorHandler()
  async findById(
    @Param() { id }: IdParamDto,
  ): Promise<HttpResponse<CreateCategorySchema>> {
    const category = await this.categoriesService.findById(id);

    return {
      statusCode: HttpStatus.OK,
      data: category,
      message: 'Category found successfully',
    };
  }

  @Delete(':id')
  @ApiExtraModels(CreateCategorySchema)
  @ApiCreatedResponse({
    description: 'Category created successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.CREATED },
        message: { type: 'string', example: 'Admin created successfully' },
      },
    },
  })
  @ErrorHandler()
  async delete(@Param() { id }: IdParamDto): Promise<HttpResponse<null>> {
    await this.categoriesService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Category deleted successfully',
    };
  }
}
