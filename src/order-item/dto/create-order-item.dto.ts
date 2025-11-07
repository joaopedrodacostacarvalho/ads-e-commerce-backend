import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do produto deve ser um inteiro' })
  @IsPositive({ message: 'O ID do produto deve ser positivo' })
  productId: number;

  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @Type(() => Number)
  @IsInt({ message: 'A quantidade deve ser um inteiro' })
  @IsPositive({ message: 'A quantidade deve ser positiva' })
  quantity: number;

  // O orderId será passado via URL, está no DTO para validações
  @IsNotEmpty({ message: 'O ID do pedido é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do pedido deve ser um inteiro' })
  @IsPositive({ message: 'O ID do pedido deve ser positivo' })
  orderId: number;
}
