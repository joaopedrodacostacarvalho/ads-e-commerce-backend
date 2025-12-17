import { ApiProperty } from "@nestjs/swagger";

export class SalesItemDetailDto {
  @ApiProperty({ example: 'Teclado Mecânico RGB' })
  produto: string;

  @ApiProperty({ example: 2 })
  quantidade: number;

  @ApiProperty({ example: 150.00 })
  preco_unitario: number;

  @ApiProperty({ example: 300.00 })
  subtotal: number;
}

