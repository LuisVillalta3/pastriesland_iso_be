import { BaseEntity } from '@common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@modules/users/entities/user.entity';
import { OrderItemEntity } from '@modules/orders/entities/order-item.entity';

export type OrderStatus =
  | 'pending'
  | 'delivered'
  | 'cancelled'
  | 'cooking'
  | 'ready_to_pickup'
  | 'received'
  | 'completed';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: [
      'pending',
      'delivered',
      'cancelled',
      'cooking',
      'ready_to_pickup',
      'received',
      'completed',
    ],
    default: 'pending',
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'enum', enum: ['cash', 'card'] })
  paymentMethod: 'cash' | 'card';
}
