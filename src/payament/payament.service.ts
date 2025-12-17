

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/order/entities/order.entity";
import { Repository } from "typeorm";
import { PayOrderDto } from "./dto/payament.dto";
import { OrderStatus } from "src/order/enums/order-status.enum";

@Injectable()
export class PayamentService{

constructor(
      @InjectRepository(Order) private orderRepo: Repository<Order>
    ) {}

  async payOrder(dto: PayOrderDto) {
  const { orderId, amount } = dto;

  // 1. Buscar a ordem
  const order = await this.orderRepo.findOne({
    where: { id: orderId },
  });

  const id = order?.id;


  if (!order) {
    throw new NotFoundException('Pedido não encontrado');
  }

  // 2. Verificar se já está paga
  if (order.status === OrderStatus.PAID) {
    throw new BadRequestException('Pedido já foi pago');
  }

  console.log(`ID DA ORDER E ESTADO: ${dto.orderId}, ${order.status} `) 
  console.log(`ID DA VAR: ${id}`)
  // 3. Verificar se está aguardando pagamento
  if (order.status !== OrderStatus.WAITING_PAYMENT) {
    console.log(`ID DA ORDER E ESTADO: ${dto.orderId}, ${order.status} `)
    throw new BadRequestException(
      'Pedido não está no estado AGUARDANDO_PAGAMENTO',
    );
  }

    

  // 4. Validar valor enviado pelo front
  if (Number(order.total) !== Number(amount)) {
    throw new BadRequestException(
      `Valor incorreto. Esperado: ${order.total}`,
    );
  }

  // 5. Atualizar pedido como PAGO
  order.status = OrderStatus.PAID;
  // order.paidAt = new Date(); // (opcional) precisa criar essa coluna na entidade (datetime)

  await this.orderRepo.save(order);

  return {
    message: 'Pagamento confirmado com sucesso!',
    orderId: order.id,
    status: order.status
  };
}




}
