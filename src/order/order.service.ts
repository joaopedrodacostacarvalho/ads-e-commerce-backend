import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientService } from "src/client/client.service";
import { ProductService } from "src/product/product.service";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order.entity";
import { OrderStatus } from "./enums/order-status.enum";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private clientService: ClientService,
    private productService: ProductService, // Para débito/crédito de estoque
  ) { }

  // Verifica se o pedido pode ser editado
  private isEditable(status: OrderStatus): boolean {
    // REGRA: Não permitir edição em pedidos pagos
    return status !== OrderStatus.PAID && status !== OrderStatus.CANCELLED;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    await this.clientService.findOne(createOrderDto.clientId); // Garante cliente existe
    const newOrder = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(newOrder);
  }

  async findAll(id: number): Promise<Order[]> {
    return this.orderRepository.findBy({ clientId: id });
  }


  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } }); // 'eager: true' carrega os itens

    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return order;
  }

  async recalculateTotals(orderId: number): Promise<Order> {
    const order = await this.findOne(orderId); // Carrega com os itens (eager: true)

    let newSubtotal = 0;
    let newTotalQuantity = 0;

    order.items.forEach(item => {
      newSubtotal += item.subtotal;
      newTotalQuantity += item.quantity;
    });

    order.subtotal = parseFloat(newSubtotal.toFixed(2));
    order.total = parseFloat(newSubtotal.toFixed(2)); // Total = Subtotal (sem frete/desconto por enquanto)
    order.totalQuantity = newTotalQuantity;

    return this.orderRepository.save(order);
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.findOne(id);
    const oldStatus = order.status;
    const newStatus = updateStatusDto.status;

    if (newStatus === OrderStatus.PAID && oldStatus !== OrderStatus.PAID) {
      // Debita o estoque para todos os itens
      for (const item of order.items) {
        await this.productService.debitStock(item.productId, item.quantity);
      }
    }
    else if (newStatus === OrderStatus.CANCELLED && oldStatus === OrderStatus.PAID) {
      // Credita o estoque de volta
      for (const item of order.items) {
        await this.productService.creditStock(item.productId, item.quantity);
      }
    }

    order.status = newStatus;
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);

    if (!this.isEditable(order.status)) {
      throw new BadRequestException(`Não é possível remover um pedido com status ${order.status}`);
    }

    await this.orderRepository.delete(id);
  }
}
