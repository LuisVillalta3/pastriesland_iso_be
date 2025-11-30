import { Module } from '@nestjs/common';
import { MocksController } from './mocks.controller';
import { MocksService } from './mocks.service';
import { AdminsService } from '@/modules/users/services/admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '@/modules/users/entities/admin.entity';
import { ErrorLogModule } from '@/modules/error-log/error-log.module';
import { CategoryEntity } from '@/modules/categories/category.entity';
import { CategoriesService } from '@/modules/categories/categories.service';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { ProductsService } from '@/modules/products/products.service';
import { ImageEntity } from '@/modules/images/entities/image.entity';

@Module({
  controllers: [MocksController],
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity,
      CategoryEntity,
      ProductEntity,
      ImageEntity,
    ]),
    ErrorLogModule,
  ],
  providers: [MocksService, AdminsService, CategoriesService, ProductsService],
})
export class MocksModule {}
