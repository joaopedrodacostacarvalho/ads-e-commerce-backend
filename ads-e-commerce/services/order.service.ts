import api from "./api";
import { Order, CreateOrderDto, UpdateOrderDto } from "./types";

export async function createOrder(dto: CreateOrderDto): Promise<Order> {
  const { data } = await api.post<Order>("/order/create", dto);
  return data;
}

export async function findOneOrder(id: number): Promise<Order> {
  const { data } = await api.get<Order>(`/order/${id}`);
  return data;
}

export async function findMyOrders(userId: number): Promise<Order[]> {
  // Se não houver endpoint, retornamos array vazio ou tentamos um endpoint lógico
  try {
    const { data } = await api.get<Order[]>(`/user/${userId}/orders`);
    return data;
  } catch {
    console.warn("Endpoint de listagem de pedidos não encontrado no Swagger.");
    return [];
  }
}
