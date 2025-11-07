import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'ID do produto a ser adicionado ao pedido', example: 25, type: Number }) 
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do produto deve ser um inteiro' })
  @IsPositive({ message: 'O ID do produto deve ser positivo' })
  productId: number;

  @ApiProperty({ description: 'Quantidade do produto a ser adicionada', example: 2, type: Number }) 
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @Type(() => Number)
  @IsInt({ message: 'A quantidade deve ser um inteiro' })
  @IsPositive({ message: 'A quantidade deve ser positiva' })
  quantity: number;

  @ApiProperty({ description: 'ID do pedido ao qual o item pertence (preenchido pela rota)', example: 101, type: Number }) 
  // O orderId será passado via URL, está no DTO para validações
  @IsNotEmpty({ message: 'O ID do pedido é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do pedido deve ser um inteiro' })
  @IsPositive({ message: 'O ID do pedido deve ser positivo' })
  orderId: number;
}
