import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { OrderStatus } from 'src/order/enums/order-status.enum';
import { OrderService } from 'src/order/order.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemService } from './order-item.services';

@Controller('order/:orderId/item') // Rota aninhada
export class OrderItemController {
  constructor(
    private readonly orderItemService: OrderItemService,
    private readonly orderService: OrderService,
  ) {}

  // POST /order/:orderId/item: Adiciona um item ao pedido
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    const order = await this.orderService.findOne(orderId);

    // Não permitir edição em pedidos pagos ou cancelados
    if (
      order.status !== OrderStatus.OPEN &&
      order.status !== OrderStatus.WAITING_PAYMENT
    ) {
      throw new BadRequestException(
        `Não é possível adicionar itens ao pedido com status ${order.status}`,
      );
    }

    createOrderItemDto.orderId = orderId;

    const orderItem = await this.orderItemService.create(createOrderItemDto);

    // Atualiza os totais do pedido após a adição
    await this.orderService.recalculateTotals(orderId);

    return orderItem;
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<void> {
    const order = await this.orderService.findOne(orderId);

    // Não permitir edição em pedidos pagos ou cancelados
    if (
      order.status !== OrderStatus.OPEN &&
      order.status !== OrderStatus.WAITING_PAYMENT
    ) {
      throw new BadRequestException(
        `Não é possível remover itens do pedido com status ${order.status}`,
      );
    }

    await this.orderItemService.remove(itemId);

    // Atualiza os totais do pedido após a remoção
    await this.orderService.recalculateTotals(orderId);
  }

  // Nota: Não é necessário um GET /order/:orderId/item, pois findOne em Order já carrega os itens.
}
