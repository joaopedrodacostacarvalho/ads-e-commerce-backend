import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productService: ProductService,
  ) {}

  // Lógica de cálculo (reutilizável)
  private calculateOrderItem(productPrice: number, quantity: number) {
    const unitPrice = parseFloat(productPrice.toFixed(2));
    const subtotal = parseFloat((unitPrice * quantity).toFixed(2));
    return { unitPrice, subtotal };
  }

  // Cria um novo item no pedido
  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const { productId, quantity } = createOrderItemDto;

    // 1. Obter o produto (e checar estoque)
    const product = await this.productService.findOne(productId);

    // 2. Não permitir adicionar produtos com estoque insuficiente
    if (product.stock < quantity) {
      throw new BadRequestException(
        `Estoque insuficiente para o produto ${product.name}. Disponível: ${product.stock}, Solicitado: ${quantity}`,
      );
    }

    // 3. Calcular valores
    const { unitPrice, subtotal } = this.calculateOrderItem(
      product.price,
      quantity,
    );

    // 4. Cria e salva o item
    const newOrderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      unitPrice,
      subtotal,
    });

    return this.orderItemRepository.save(newOrderItem);
  }

  // Remove um item do pedido (pode ser usado para o CRUD)
  async remove(id: number): Promise<void> {
    const result = await this.orderItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item do pedido com ID ${id} não encontrado`);
    }
  }
}
