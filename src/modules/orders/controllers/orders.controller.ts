import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '@modules/orders/orders.service';
import { ClientGuard } from '@modules/auth/guards/client.guard';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';
import { CreateOrderDto } from '@modules/orders/dto/create-order.dto';

@Controller('orders')
@ApiTags('Orders')
@UseGuards(ClientGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @ErrorHandler()
  async createOrder(@Body() orderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(orderDto);

    return {
      statusCode: HttpStatus.OK,
      data: order,
      message: 'Product created successfully',
    };
  }

  @Get('my-orders/:clientId')
  async getMyOrders(@Param('clientId') clientId: string) {
    const orders = await this.orderService.getUserOrders(clientId);

    return {
      statusCode: HttpStatus.OK,
      data: orders,
      message: 'Orders retrieved successfully',
    };
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    const order = await this.orderService.getOrderById(orderId);

    return {
      statusCode: HttpStatus.OK,
      data: order,
      message: 'Order retrieved successfully',
    };
  }
}
