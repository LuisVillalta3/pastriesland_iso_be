import { EnvConfig } from '@/config/env.config';
import { CategoriesService } from '@/modules/categories/categories.service';
import { ProductsService } from '@/modules/products/products.service';
import { AdminsService } from '@/modules/users/services/admins.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';

const PRODUCT_CATEGORIES = [
  'Pasteles de emergencia',
  'Pick and Go',
  'Pasteles',
  'CupCakes',
  'Cookies',
  'Cajas combinadas',
  'Alfajores',
  'Cardenal',
  'Brownies',
  'Complementos',
];

@Injectable()
export class MocksService {
  constructor(
    private readonly configService: ConfigService<EnvConfig>,
    private readonly adminsService: AdminsService,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {
    if (this.configService.get('IS_PRODUCTION')) {
      throw new Error(
        'Mock data creation is not allowed in production environment.',
      );
    }
  }

  async createMockAdmin(): Promise<{ email: string; password: string }> {
    const email = this.configService.get('ADMIN_EMAIL') || 'admin@admin.com';
    const { password } = await this.adminsService.createAdmin({
      name: this.configService.get('ADMIN_NAME') || 'Super',
      lastName: this.configService.get('ADMIN_LASTNAME') || 'Admin',
      email,
    });

    return { email, password };
  }

  async createMockCategories(): Promise<void> {
    await Promise.all(
      PRODUCT_CATEGORIES.map((name) =>
        this.categoriesService.create({ name, isActive: true }),
      ),
    );
  }

  async createMockProducts(): Promise<void> {
    const categories = await this.categoriesService.findAll({
      paginated: false,
    });

    const categoryIds = categories.results.map((cat) => cat.id);

    await Promise.all(
      Array.from({ length: 100 }).map(() => {
        const randomCategoriesId = faker.helpers.arrayElements(categoryIds, {
          min: 1,
          max: 3,
        });

        return this.productsService.create({
          name: faker.commerce.productName(),
          active: true,
          basePrice: faker.finance.amount({ min: 10, max: 100, dec: 2 }),
          isComplement: false,
          units: Math.floor(Math.random() * 100) + 1,
          minPortions: Math.floor(Math.random() * 5) + 1,
          maxPortions: Math.floor(Math.random() * 30) + 1,
          categoriesIDs: randomCategoriesId,
          isOutstanding: faker.datatype.boolean(),
          addons: faker.lorem
            .words(Math.floor(Math.random() * 5) + 1)
            .split(' ')
            .join(', '),
          flavors: faker.lorem
            .words(Math.floor(Math.random() * 5) + 1)
            .split(' ')
            .join(', '),
          design: faker.lorem
            .words(Math.floor(Math.random() * 5) + 1)
            .split(' ')
            .join(', '),
        });
      }),
    );
  }
}
