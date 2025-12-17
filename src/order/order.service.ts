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

  async create(userId: number) {

  // Criamos um queryRunner porque vamos executar várias operações como uma única transação
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // ====================================================
    // 1. Buscar carrinho do usuário com itens + produtos
    // ====================================================
    const cart = await queryRunner.manager.findOne(Cart, {
      where: { userId },
      relations: ['items', 'items.product'], // carrega os produtos dentro dos itens
    });

    // Validações básicas
    if (!cart) throw new NotFoundException('Carrinho não encontrado');
    if (!cart.items || cart.items.length === 0)
      throw new BadRequestException('Carrinho está vazio');



    // ====================================================
    // 2. Criar a Order com status AGUARDANDO_PAGAMENTO
    // ====================================================
    const order = queryRunner.manager.create(Order, {
      userId,
      client: { id: userId },  // ManyToOne para User
      status: OrderStatus.WAITING_PAYMENT, // ← importante!
      subtotal: 0,
      total: 0,
      totalQuantity: 0,
      createdAt: new Date(), // para o cron saber quando expira
    });

    // Salva o pedido no banco
    const savedOrder = await queryRunner.manager.save(order);



    // ====================================================
    // 3. Criar OrderItems e reservar estoque
    // ====================================================
    let total = 0;

    for (const cartItem of cart.items) {
      const product = cartItem.product;

      // Verifica se o estoque disponível suporta o pedido
      if (product.stock - product.reservedStock < cartItem.quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto: ${product.name}`,
        );
      }

      // Calcula subtotal do item
      const itemTotal = cartItem.quantity * cartItem.unitPrice;
      total += itemTotal;

      // Cria o item do pedido
      const orderItem = queryRunner.manager.create(OrderItem, {
        order: savedOrder,
        productId: product.id,
        quantity: cartItem.quantity,
        unitPrice: cartItem.unitPrice,
        subtotal: itemTotal,
      });

      await queryRunner.manager.save(orderItem);

      // ====================================================
      // 3.1 Congelar estoque (reservar)
      // ====================================================
      product.reservedStock += cartItem.quantity; // adiciona à reserva
      await queryRunner.manager.save(product);
    }



    // ====================================================
    // 4. Atualizar order com valores finais
    // ====================================================
    savedOrder.subtotal = total;
    savedOrder.total = total; // frete/descontos podem ser adicionados depois
    savedOrder.totalQuantity = cart.items.length;

    await queryRunner.manager.save(savedOrder);



    // ====================================================
    // 5. Esvaziar o carrinho
    // ====================================================
    await queryRunner.manager.remove(Cart_item, cart.items);

    cart.items = [];
    await queryRunner.manager.save(cart);



    // ====================================================
    // 6. Commit da transação
    // ====================================================
    await queryRunner.commitTransaction();


    // ====================================================
    // 7. Retorno final
    // ====================================================
    return {
      message: 'Pedido criado com sucesso!',
      orderId: savedOrder.id,
      total: savedOrder.total,
      items: savedOrder.totalQuantity,
      status: savedOrder.status, // AGUARDANDO_PAGAMENTO
    };

  } catch (error) {

    // Se algo falhar, desfaz tudo
    await queryRunner.rollbackTransaction();
    throw error;

  } finally {

    // Libera conexão
    await queryRunner.release();
  }
}


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


  
  
    

  // Verifica se o pedido pode ser editado
  private isEditable(status: OrderStatus): boolean {
    // REGRA: Não permitir edição em pedidos pagos
    return status !== OrderStatus.PAID && status !== OrderStatus.CANCELLED;
  }


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
