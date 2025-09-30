import { Module } from '@nestjs/common';
import { GlobalConfigModule } from './config/global-config.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
