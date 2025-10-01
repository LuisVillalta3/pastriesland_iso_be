import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { ProductEntity } from '@modules/products/entities/product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}
