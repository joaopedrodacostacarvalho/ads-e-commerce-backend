import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID do cliente que está criando o pedido', example: 5, type: Number })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do cliente deve ser um número inteiro' })
  @IsPositive({ message: 'O ID do cliente deve ser positivo' })
  clientId: number;
}
