import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '@modules/orders/entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from '@modules/orders/dto/create-order.dto';
import { ClientEntity } from '@modules/users/entities/client.entity';
import { OrderItemEntity } from '@modules/orders/entities/order-item.entity';
import { ImageEntity } from '@modules/images/entities/image.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(orderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.clientRepo.findOne({
        where: { id: orderDto.userId },
      });

      if (!user) throw new NotFoundException('User not found');

      const order = queryRunner.manager.create(OrderEntity, {
        ...orderDto,
        total: orderDto.total.replace(/[^0-9.-]+/g, ''),
        user,
        status: 'pending',
        items: [],
      });

      const savedOrder = await queryRunner.manager.save(OrderEntity, order);

      for (const item of orderDto.items) {
        const p = queryRunner.manager.create(OrderItemEntity, {
          productName: item.name,
          productId: item.id,
          flavors: item.flavors || '',
          addons: item.addons || '',
          design: item.design || '',
          productPrice: item.basePrice,
          order: savedOrder,
        });

        await queryRunner.manager.save(OrderItemEntity, p);
      }

      await queryRunner.commitTransaction();
      return order;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  getUserOrders(userId: string) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(orderId: string) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['items', 'user'],
    });

    if (!order) throw new NotFoundException('Order not found');

    order.items = await Promise.all(
      order.items.map((item) => this.addProductImages(item)),
    );

    return order;
  }

  async addProductImages(product: OrderItemEntity) {
    product.images = await this.imageRepo.find({
      where: {
        imageableId: product.id,
        imageableType: 'products',
      },
    });

    const finalProduct = {
      ...product,
      name: product.productName,
      basePrice: product.productPrice,
    };

    return finalProduct;
  }
}
