import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@modules/categories/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProps } from '@common/interfaces/pagination-props.interface';
import { CategoryDto } from '@modules/categories/dto/category.dto';
import { generatePagination } from '@/utils/generate-pagination.util';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async findAll(options?: PaginationProps) {
    const { paginated = false, page = 1, limit = 10 } = options || {};
    const currentPage = Number(page);

    const query = this.categoryRepo.createQueryBuilder('category');

    if (!paginated) {
      const data = await query.getMany();
      return { results: data };
    }

    return await generatePagination<CategoryEntity>(
      query,
      currentPage,
      Number(limit),
    );
  }

  async create({ name, isActive }: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepo.save({
      name,
      isActive,
    });
  }

  async findById(id: string) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  async update(
    id: string,
    { name, isActive }: CategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.findById(id);

    category.name = name;
    category.isActive = isActive;

    return await this.categoryRepo.save(category);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.categoryRepo.softDelete({ id });
  }
}
