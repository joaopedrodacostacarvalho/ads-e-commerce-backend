import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { OrderStatus } from 'src/order/enums/order-status.enum';
import { Product } from 'src/product/entities/product.entity';
import { Repository, In } from 'typeorm';
import { SalesHistoryResponseDto } from './dto/salesHistoryResponse.dto';


@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) { }

  async getSalesBySeller(sellerId: number): Promise<SalesHistoryResponseDto[]> {
    // 1. Buscar todos os produtos que pertencem a este vendedor
    const myProducts = await this.productRepository.find({
      where: { categoryId: sellerId }, // Ajuste para o campo correto que liga ao User/Vendedor
      select: ['id'] // Otimização: trazer apenas o ID
    });

    if (!myProducts.length) {
      return [];
    }

    const myProductIds = myProducts.map((p) => p.id);

    // 2. Buscar Orders que:
    //    a) Tenham status 'PAGO'
    //    b) Contenham itens com os IDs dos meus produtos
    const orders = await this.orderRepository.find({
      relations: ['items', 'items.product'],
      where: {
        status: OrderStatus.PAID, // <--- FILTRO ADICIONADO AQUI
        items: {
          product: {
            id: In(myProductIds),
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    // 3. Transformar os dados para o formato de retorno solicitado
    const salesHistory: SalesHistoryResponseDto[] = orders.map((order) => {
      // Filtrar itens dentro do pedido (para não mostrar itens de outros vendedores)
      const myItemsInOrder = order.items.filter((item) =>
        myProductIds.includes(item.product.id),
      );

      // Calcular o subtotal apenas da parte deste vendedor neste pedido
      const totalVendaVendedor = myItemsInOrder.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      );

      return {
        order_id: order.id,
        data_venda: order.createdAt.toISOString().split('T')[0], // Retorna YYYY-MM-DD
        status_pagamento: order.status,
        total_venda_vendedor: totalVendaVendedor,
        itens: myItemsInOrder.map((item) => ({
          produto: item.product.name,
          quantidade: item.quantity,
          preco_unitario: item.product.price,
          subtotal: item.quantity * item.product.price,
        })),
      };
    });

    return salesHistory;
  }
}
