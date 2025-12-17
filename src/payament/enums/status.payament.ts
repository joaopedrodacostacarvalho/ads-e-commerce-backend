export enum status_payament {
  /**
   * O pedido foi recebido e está aguardando processamento.
   */
  PENDING = 'PENDING',

  /**
   * O pedido foi aprovado e está sendo preparado para envio.
   */
  APPROVED = 'APPROVED',

  /**
   * O pedido foi recusado ou cancelado.
   */
  DECLINED = 'DECLINED',
}