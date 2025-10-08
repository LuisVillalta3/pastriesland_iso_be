import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { CategoryEntity } from '@modules/categories/category.entity';
import { ProductVariantEntity } from '@modules/products/entities/product-variant.entity';
import { ImageableEntity } from '@common/entities/imageable.entity';
import { ImageEntity } from '@modules/images/entities/image.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity implements ImageableEntity {
  imageableType: string = 'products';

  @Column()
  name: string;

  @Column({ name: 'base_price', type: 'decimal', precision: 12, scale: 2 })
  basePrice: string;

  @Column()
  active: boolean;

  @Column({ name: 'is_complement' })
  isComplement: boolean;

  @Column({ type: 'int', nullable: true })
  units: number;

  @Column({ type: 'int', nullable: true })
  minPortions: number;

  @Column({ type: 'int', nullable: true })
  maxPortions: number;

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    nullable: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => ProductVariantEntity, (flavor) => flavor.product, {
    cascade: true,
  })
  variants: ProductVariantEntity[];

  images: ImageEntity[] = [];

  @Column({ default: false })
  isOutstanding: boolean;

  @Column({ default: '', nullable: true })
  addons: string;

  @Column({ default: '', nullable: true })
  flavors: string;

  @Column({ default: '', nullable: true })
  design: string;
}
