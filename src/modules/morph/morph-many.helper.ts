import { MorpEntity } from '@modules/morph/morp-entity.interface';
import { Repository } from 'typeorm';
import { ImageEntity } from '@modules/images/entities/image.entity';

export async function morphMany<T extends MorpEntity>(
  repo: Repository<ImageEntity>,
  models: T[] | T,
  type: string,
): Promise<T[] | T> {
  const isArray = Array.isArray(models);
  const items = isArray ? models : [models];

  const ids = items.map((item) => item.id);

  const images = await repo.find({
    where: {
      imageableType: type,
      imageableId: ids[0],
    },
  });

  const grouped = new Map<string, ImageEntity[]>();

  for (const img of images) {
    if (!grouped.has(img.imageableId)) grouped.set(img.imageableId, []);
    grouped.get(img.imageableId)!.push(img);
  }

  for (const model of items) {
    model.images = grouped.get(model.id) || [];
  }

  return isArray ? items : items[0];
}
