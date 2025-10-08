import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@config/global-config.module';
import { DatabaseModule } from '@database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ErrorLogModule } from '@modules/error-log/error-log.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    ErrorLogModule,
    ProductsModule,
    CategoriesModule,
    ImagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/public',
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
