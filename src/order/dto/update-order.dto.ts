import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ 
    description: 'Novo status do pedido. Usado apenas para mudança de status, ex: PAGAMENTO, CANCELAMENTO.', 
    enum: OrderStatus, 
    example: OrderStatus.PAID,
    // Exclui OPEN da lista de alteração, pois é o status inicial
    enumName: 'OrderStatusOptions' 
  }) // NOVO
  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsString({ message: 'O status deve ser uma string' })
  // Garante que o novo status seja um dos valores válidos do ENUM
  @IsIn(
    [
      OrderStatus.WAITING_PAYMENT,
      OrderStatus.PAID,
      OrderStatus.CANCELLED,
      // OPEN  não  precisa de um PATCH
    ],
    {
      message: `Status inválido. Use ${Object.values(OrderStatus).join(', ')}`,
    },
  )
  status: OrderStatus;
}
