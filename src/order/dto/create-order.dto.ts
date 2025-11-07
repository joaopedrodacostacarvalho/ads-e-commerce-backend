import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do cliente deve ser um número inteiro' })
  @IsPositive({ message: 'O ID do cliente deve ser positivo' })
  clientId: number;
}
