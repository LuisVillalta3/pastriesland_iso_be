import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@modules/images/entities/image.entity';
import { UploadsController } from '@modules/images/uploads.controller';
import { ErrorLogModule } from '@modules/error-log/error-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity]), ErrorLogModule],
  exports: [TypeOrmModule, ImagesService],
  providers: [ImagesService],
  controllers: [UploadsController],
})
export class ImagesModule {}
