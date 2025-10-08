import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { ProductEntity } from '@modules/products/entities/product.entity';

export type ProductVariantType = 'flavor' | 'design';

@Entity({ name: 'product_variants' })
export class ProductVariantEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: string;

  @Column({ type: 'enum', enum: ['flavor', 'design'] })
  type: ProductVariantType;

  @ManyToOne(() => ProductEntity, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
