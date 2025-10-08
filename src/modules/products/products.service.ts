import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DataSource,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
} from 'typeorm';
import { ProductEntity } from '@modules/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  VariantDto,
} from '@modules/products/dto/create-product.dto';
import { CategoryEntity } from '@modules/categories/category.entity';
import { ProductVariantEntity } from '@modules/products/entities/product-variant.entity';
import { PaginationProps } from '@common/interfaces/pagination-props.interface';
import { generatePagination } from '@/utils/generate-pagination.util';
import { ImageEntity } from '@modules/images/entities/image.entity';
import { GetProductsDto } from '@modules/products/dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(productDto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const categoriesEntities = await this.findCategoriesById(
        productDto.categoriesIDs,
        queryRunner,
      );

      const product = queryRunner.manager.create(ProductEntity, {
        name: productDto.name,
        active: productDto.active,
        basePrice: productDto.basePrice,
        isComplement: productDto.isComplement,
        maxPortions: productDto.maxPortions,
        minPortions: productDto.minPortions,
        units: productDto.units,
        isOutstanding: productDto.isOutstanding,
        categories: categoriesEntities,
        addons: productDto.addons,
        flavors: productDto.flavors,
        design: productDto.design,
      });

      const savedProduct = await queryRunner.manager.save(
        ProductEntity,
        product,
      );

      await this.setVariants(
        productDto?.variants || [],
        savedProduct,
        queryRunner,
      );

      await queryRunner.commitTransaction();
      return savedProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    return this.addProductImages(product);
  }

  async update(id: string, productDto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.findById(id);

      Object.assign(product, {
        ...productDto,
      });

      product.categories = await this.findCategoriesById(
        productDto.categoriesIDs,
        queryRunner,
      );

      if (productDto.variants?.length) {
        await queryRunner.manager.softDelete(ProductVariantEntity, {
          product: { id: product.id },
        });

        await this.setVariants(productDto.variants, product, queryRunner);
      }

      const updatedProduct = await queryRunner.manager.save(
        ProductEntity,
        product,
      );

      await queryRunner.commitTransaction();

      return updatedProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softDelete(ProductVariantEntity, {
        product: { id },
      });

      await queryRunner.manager.softDelete(ProductEntity, { id });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(options?: PaginationProps) {
    const { paginated = false, page = 1, limit = 10 } = options || {};
    const currentPage = Number(page);

    const query = this.productRepo.createQueryBuilder('product');

    if (!paginated) {
      const data = await query.getMany();
      return { results: data };
    }

    return await generatePagination<ProductEntity>(
      query,
      currentPage,
      Number(limit),
    );
  }

  private async findCategoriesById(
    categoriesIds: string[],
    queryRunner: QueryRunner,
  ) {
    if (!categoriesIds?.length) return [];

    return await queryRunner.manager.findBy<CategoryEntity>(CategoryEntity, {
      id: In(categoriesIds),
    });
  }

  private async setVariants(
    variants: VariantDto[],
    savedProduct: ProductEntity,
    queryRunner: QueryRunner,
  ) {
    if (!variants?.length) return;

    const variantsEntities = variants.map((variant) =>
      queryRunner.manager.create(ProductVariantEntity, {
        ...variant,
        product: savedProduct,
      }),
    );

    await queryRunner.manager.save(ProductVariantEntity, variantsEntities);
  }

  async getActiveProducts(getProductsDto: GetProductsDto) {
    const {
      onlyOutstandings = false,
      categories = "",
      paginated = false,
      page = 1,
      limit = 10,
    } = getProductsDto;

    const query = this.productRepo
      .createQueryBuilder('product')
      .andWhere('product.active = :active', { active: true });

    if (onlyOutstandings.toString() == 'true') {
      query.andWhere('product.isOutstanding = :isOutstanding', {
        isOutstanding: true,
      });
    }

    const categoriesFilter = categories.split(',');

    if (categoriesFilter.length && categoriesFilter[0]) {
      query
        .leftJoin('product.categories', 'category')
        .andWhere('category.id IN (:...categoriesFilter)', {
          categoriesFilter,
        });
    }

    if (paginated.toString() == 'false') {
      const products = await query.getMany();

      const data = products.map(async (p) => this.addProductImages(p));

      return Promise.all(data);
    }

    const { results, paginationProps } =
      await generatePagination<ProductEntity>(
        query,
        Number(page),
        Number(limit),
      );

    const data = results.map(async (p) => this.addProductImages(p));

    const products = await Promise.all(data);

    return {
      results: products,
      paginationProps,
    };
  }

  async addProductImages(product: ProductEntity) {
    product.images = await this.imageRepo.find({
      where: {
        imageableId: product.id,
        imageableType: 'products',
      },
    });

    return product;
  }
}
