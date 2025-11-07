import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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
