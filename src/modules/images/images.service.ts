import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '@modules/images/entities/image.entity';
import { Repository } from 'typeorm';
import { UploadDto } from '@modules/images/upload.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepo: Repository<ImageEntity>,
  ) {}

  async create(imagePath: string, { imageableId, imageableType }: UploadDto) {
    const image = this.imageRepo.create({
      path: imagePath,
      imageableId,
      imageableType,
    });

    return this.imageRepo.save(image);
  }

  async delete(id: number) {
    await this.imageRepo.delete(id);
  }

  async findByOwner(type: string, id: string) {
    return this.imageRepo.find({
      where: { imageableType: type, imageableId: id },
    });
  }
}
