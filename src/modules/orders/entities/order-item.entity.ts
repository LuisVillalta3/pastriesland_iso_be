import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { OrderEntity } from '@modules/orders/entities/order.entity';

@Entity('order_items')
export class OrderItemEntity extends BaseEntity {
  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  productPrice: string;

  @Column({ default: '', nullable: true })
  addons: string;

  @Column({ default: '', nullable: true })
  flavors: string;

  @Column({ default: '', nullable: true })
  design: string;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  order: OrderEntity;
}
