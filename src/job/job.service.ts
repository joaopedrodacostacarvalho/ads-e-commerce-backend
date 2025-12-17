import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Order } from 'src/order/entities/order.entity';
import { OrderStatus } from 'src/order/enums/order-status.enum';
import { DataSource, LessThan } from 'typeorm';
// import { Order } from '../entities/order.entity';
// import { OrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrderExpirationService {
  private readonly logger = new Logger(OrderExpirationService.name);

  constructor(private dataSource: DataSource) {}

  // roda a cada 1 minuto
  @Cron(CronExpression.EVERY_MINUTE)
  async checkExpiredOrders() {
    this.logger.log('Verificando pedidos expirados...');

    const now = new Date();
    const expireLimit = new Date(now.getTime() - 30 * 60 * 1000); 
    // const expireLimit = new Date(now.getTime() - 1 * 60 * 1000); //1mnt

    // buscar pedidos que estão aguardando pagamento há mais de 30 min
    const orders = await this.dataSource.getRepository(Order).find({
      where: {
        status: OrderStatus.WAITING_PAYMENT,
        createdAt: LessThan(expireLimit),
      },
      relations: ['items', 'items.product'],
    });

    if (orders.length === 0) return;

    for (const order of orders) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // liberar estoque reservado
        for (const item of order.items) {
          const product = item.product;

          product.stock += item.quantity; // devolve ao estoque
          product.reservedStock -= item.quantity; // remove reserva

          await queryRunner.manager.save(product);
        }

        // marcar pedido como cancelado
        order.status = OrderStatus.CANCELLED;
        order.cancelReason = 'Pagamento não finalizado no prazo de 30 minutos';

        await queryRunner.manager.save(order);

        await queryRunner.commitTransaction();

        this.logger.warn(`Pedido ${order.id} cancelado por expiração.`);
      } catch (e) {
        await queryRunner.rollbackTransaction();
        this.logger.error(`Erro ao cancelar pedido ${order.id}: `, e);
      } finally {
        await queryRunner.release();
      }
    }
  }
}
