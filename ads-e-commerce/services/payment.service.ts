import { api } from "../app/api";
import { PayOrderDto, Order } from "./types";

const BASE_URL = "/payament";

export const payamentService = {
  /** POST /payament/pay - Simular pagamento de um pedido */
  payOrder: async (payload: PayOrderDto): Promise<Order> => {
    // Assumindo que retorna a Order atualizada
    const response = await api.post<Order>(`${BASE_URL}/pay`, payload);
    return response.data;
  },
};
