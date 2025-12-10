import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/client/user.service";
import { ProductService } from "src/product/product.service";
import { DataSource, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order.entity";
import { OrderStatus } from "./enums/order-status.enum";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { CartService } from "src/cart/cart.service";
import { Cart } from "src/cart/entity/cart.entity";
import { Cart_item } from "src/cart-item/entity/cartItem.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService,
    
    // Para débito/crédito de estoque
    @InjectDataSource() 
    private dataSource: DataSource,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Cart_item) private cartItemRepo: Repository<Cart_item>,
  ) { }


//   async createOrder(userId: number) {
//   const queryRunner = this.dataSource.createQueryRunner();
//   await queryRunner.connect();
//   await queryRunner.startTransaction();

//   try {
//     // ====================================================
//     // 1. Buscar carrinho
//     // ====================================================
//     const cart = await queryRunner.manager.findOne(Cart, {
//       where: { userId },
//       relations: ['items', 'items.product'],
//     });

//     if (!cart) {
//       throw new NotFoundException('Carrinho não encontrado');
//     }

//     if (cart.items.length === 0) {
//       throw new BadRequestException('Carrinho está vazio');
//     }

//     // ====================================================
//     // 2. Criar Order
//     // ====================================================
//     const order = queryRunner.manager.create(Order, { 
//       userId,                     // obrigatório
//       client: { id: userId },     // relação ManyToOne
//       status: OrderStatus.OPEN,
//       subtotal: 0,
//       total: 0,
//       totalQuantity: 0,
//     });

//     const savedOrder = await queryRunner.manager.save(order);

//     // ====================================================
//     // 3. Criar OrderItem
//     // ====================================================
//     let total = 0;

//     for (const cartItem of cart.items) {
//       const itemTotal = cartItem.quantity * cartItem.product.price;
//       total += itemTotal;

//       const orderItem = queryRunner.manager.create(OrderItem, {
//         order: savedOrder,
//         productId: cartItem.product.id,
//         quantity: cartItem.quantity,
//         price: cartItem.product.price,
//         subtotal: itemTotal,
//       });

//       await queryRunner.manager.save(orderItem);
//     }

//     // ====================================================
//     // 4. Atualizar Order com totais
//     // ====================================================
//     savedOrder.subtotal = total;
//     savedOrder.total = total;
//     savedOrder.totalQuantity = cart.items.length;

//     await queryRunner.manager.save(savedOrder);

//     // ====================================================
//     // 5. Limpar carrinho
//     // ====================================================
//     await queryRunner.manager.remove(Cart_item, cart.items);

//     cart.items = [];
//     await queryRunner.manager.save(cart);

//     // ====================================================
//     // 6. Commit
//     // ====================================================
//     await queryRunner.commitTransaction();

//     return {
//       message: 'Pedido criado com sucesso',
//       orderId: savedOrder.id,
//       total: savedOrder.total,
//       items: savedOrder.totalQuantity,
//     };

//   } catch (error) {
//     await queryRunner.rollbackTransaction();
//     throw error;
//   } finally {
//     await queryRunner.release();
//   }
// }
//////////sdlkdkkdfkfkfkkfkf
async createOrder(userId: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // ====================================================
    // 1. Buscar carrinho do usuário com itens e produtos
    // ====================================================
    const cart = await queryRunner.manager.findOne(Cart, {
      where: { userId },
      relations: ['items', 'items.product'],
    });

    if (!cart) throw new NotFoundException('Carrinho não encontrado');
    if (!cart.items || cart.items.length === 0) throw new BadRequestException('Carrinho está vazio');

    // ====================================================
    // 2. Criar a Order
    // ====================================================
    const order = queryRunner.manager.create(Order, {
      userId,
      client: { id: userId },  // relacionamento ManyToOne
      status: OrderStatus.OPEN,
      subtotal: 0,
      total: 0,
      totalQuantity: 0,
    });

    const savedOrder = await queryRunner.manager.save(order);

    // ====================================================
    // 3. Criar OrderItems
    // ====================================================
    let total = 0;

    for (const cartItem of cart.items) {
      const itemTotal = cartItem.quantity * cartItem.unitPrice;
      total += itemTotal;

      const orderItem = queryRunner.manager.create(OrderItem, {
        order: savedOrder,
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
        unitPrice: cartItem.unitPrice,
        subtotal: itemTotal,
      });

      await queryRunner.manager.save(orderItem);
    }

    // ====================================================
    // 4. Atualizar Order com totais
    // ====================================================
    savedOrder.subtotal = total;
    savedOrder.total = total; // aqui você pode adicionar frete ou descontos futuramente
    savedOrder.totalQuantity = cart.items.length;

    await queryRunner.manager.save(savedOrder);

    // ====================================================
    // 5. Limpar carrinho
    // ====================================================
    await queryRunner.manager.remove(Cart_item, cart.items);

    cart.items = [];
    await queryRunner.manager.save(cart);

    // ====================================================
    // 6. Commit
    // ====================================================
    await queryRunner.commitTransaction();

    return {
      message: 'Pedido criado com sucesso',
      orderId: savedOrder.id,
      total: savedOrder.total,
      items: savedOrder.totalQuantity,
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

//   async createOrder(userId: number) {
//   // Criamos um QueryRunner: permite executar tudo em TRANSAÇÃO
//   // Se algo der errado, damos rollback.
//   const queryRunner = this.dataSource.createQueryRunner();

//   // Abrimos conexão
//   await queryRunner.connect();

//   // Iniciamos transação
//   await queryRunner.startTransaction();

//   try {
//     // ====================================================
//     // 1. Buscar o carrinho completo do usuário
//     // ====================================================
//     const cart = await queryRunner.manager.findOne(Cart, {
//       where: { userId },
//       relations: ['items', 'items.product'], // pega itens + produtos
//     });

//     if (!cart) {
//       throw new NotFoundException('Carrinho não encontrado');
//     }

//     if (cart.items.length === 0) {
//       throw new BadRequestException('Carrinho está vazio');
//     }

//     // ====================================================
//     // 2. Criar a Order (pedido)
//     // ====================================================
//     const order = queryRunner.manager.create(Order, { 
//      client: { id: userId },  // ou user: { id: userId } dependendo da sua entidade
//      status: OrderStatus.OPEN, // status inicial
//      subtotal: 0,
//      total: 0,
//      totalQuantity: 0,
//     });

//     // salvar a order
//     const savedOrder = await queryRunner.manager.save(order);

//     // ====================================================
//     // 3. Criar os OrderItems com base nos itens do carrinho
//     // ====================================================
//     let total = 0;

//     for (const cartItem of cart.items) {
//       const itemTotal = cartItem.quantity * cartItem.product.price;
//       total += itemTotal;

//       // Criamos cada item do pedido
//       const orderItem = queryRunner.manager.create(OrderItem, {
//         order: savedOrder,                // relacionamento
//         productId: cartItem.product.id,
//         quantity: cartItem.quantity,
//         price: cartItem.product.price,
//         subtotal: itemTotal,
//       });

//       // salvamos item
//       await queryRunner.manager.save(orderItem);
//     }

//     // ====================================================
//     // 4. Atualizar total da Order
//     // ====================================================
//     savedOrder.total = total;
//     await queryRunner.manager.save(savedOrder);

//     // ====================================================
//     // 5. Limpar o carrinho
//     // ====================================================

//     // remover os itens do carrinho
//     await queryRunner.manager.remove(Cart_item, cart.items);

//     // garantir carrinho vazio
//     cart.items = [];
//     await queryRunner.manager.save(cart);

//     // ====================================================
//     // 6. Finalizar transação com sucesso
//     // ====================================================
//     await queryRunner.commitTransaction();

//     return {
//       message: 'Pedido criado com sucesso',
//       orderId: savedOrder.id,
//       total: total,
//     };
//   } catch (error) {
//     // Se der qualquer erro, desfaz tudo
//     await queryRunner.rollbackTransaction();
//     throw error;
//   } finally {
//     // Encerra o queryRunner SEMPRE
//     await queryRunner.release();
//   }
// }

  
  
    

  // Verifica se o pedido pode ser editado
  private isEditable(status: OrderStatus): boolean {
    // REGRA: Não permitir edição em pedidos pagos
    return status !== OrderStatus.PAID && status !== OrderStatus.CANCELLED;
  }


  // //pegar id do usuario logado(CORRIGIR, PEGAR ID DO USER DO TOKEN NO CONTROLLER)
  // async create(createOrderDto: CreateOrderDto): Promise<Order> {
  //   await this.userService.findOne(createOrderDto.clientId); // Garante cliente existe
  //   const newOrder = this.orderRepository.create(createOrderDto);
  //   return this.orderRepository.save(newOrder);
  // }

  // //paginacao (CORRIGIR, PEGAR ID DO USER DO TOKEN NO CONTROLLER)
  // async findAll(id: number): Promise<Order[]> {
  //   return this.orderRepository.findBy({ clientId: id });
  // }


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
