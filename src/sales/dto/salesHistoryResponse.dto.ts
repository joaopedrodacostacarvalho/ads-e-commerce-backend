import { ApiProperty } from "@nestjs/swagger";
import { SalesItemDetailDto } from "./salesItemDetail.dto";

export class SalesHistoryResponseDto {
  @ApiProperty({ example: 123 })
  order_id: number;

  @ApiProperty({ example: '2025-12-17' })
  data_venda: string;

  @ApiProperty({ example: 'PAGO' })
  status_pagamento: string;

  @ApiProperty({ type: [SalesItemDetailDto] })
  itens: SalesItemDetailDto[];

  @ApiProperty({ example: 300.00 })
  total_venda_vendedor: number;
}

