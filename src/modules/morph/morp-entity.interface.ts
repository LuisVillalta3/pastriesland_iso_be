import { ImageEntity } from '@modules/images/entities/image.entity';

export interface MorpEntity {
  id: string;
  images?: ImageEntity[];
}
