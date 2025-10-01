import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '@modules/categories/categories.service';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  @ErrorHandler()
  async findAll() {
    return this.categoriesServices.findAll();
  }
}
