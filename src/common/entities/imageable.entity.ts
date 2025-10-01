import { ImageEntity } from '@modules/images/entities/image.entity';

export interface ImageableEntity {
  imageableType: string;
  images: ImageEntity[];
}
