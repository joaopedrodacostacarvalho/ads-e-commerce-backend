export interface SalesItemDetail {
  produto: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

export interface SalesHistory {
  order_id: number;
  data_venda: string;
  status_pagamento: string;
  total_venda_vendedor: number;
  itens: SalesItemDetail[];
}
