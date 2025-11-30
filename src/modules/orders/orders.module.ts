import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@modules/orders/entities/order.entity';
import { OrderItemEntity } from '@modules/orders/entities/order-item.entity';
import { ErrorLogModule } from '@modules/error-log/error-log.module';
import { OrdersController } from './controllers/orders.controller';
import { ClientEntity } from '@modules/users/entities/client.entity';

@Module({
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, ClientEntity]),
    ErrorLogModule,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
