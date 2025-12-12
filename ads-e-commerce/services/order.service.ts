import api from "./api";
import {
  Order,
  CreateOrderDt,
  UpdateOrderDto,
  CreateOrderItemDto,
} from "./types";

/**
 * Endpoint: POST /order/create
 * Sumário: Novo Criar um pedido (order). (Requer JWT)
 */
export async function createOrder(data: CreateOrderDt): Promise<Order> {
  const response = await api.post<Order>("/order/create", data);
  return response.data;
}

/**
 * Endpoint: GET /order/{id}
 * Sumário: Busca um pedido por ID.
 */
export async function findOneOrder(id: number): Promise<Order> {
  const response = await api.get<Order>(`/order/${id}`);
  return response.data;
}

/**
 * Endpoint: DELETE /order/{id}
 * Sumário: Remove (cancela) um pedido.
 */
export async function removeOrder(id: number): Promise<void> {
  await api.delete(`/order/${id}`);
}

/**
 * Endpoint: PATCH /order/{id}/status
 * Sumário: Atualiza o status de um pedido.
 */
export async function updateOrderStatus(
  id: number,
  data: UpdateOrderDto
): Promise<Order> {
  const response = await api.patch<Order>(`/order/${id}/status`, data);
  return response.data;
}

// --- OrderItem Endpoints ---

/**
 * Endpoint: POST /order/{orderId}/item
 * Sumário: Adiciona um novo item ao pedido especificado.
 */
export async function createOrderItem(
  orderId: number,
  data: Omit<CreateOrderItemDto, "orderId">
): Promise<any> {
  const payload = { ...data, orderId };
  const response = await api.post(`/order/${orderId}/item`, payload);
  return response.data;
}

/**
 * Endpoint: DELETE /order/{orderId}/item/{itemId}
 * Sumário: Remove um item específico de um pedido.
 */
export async function removeOrderItem(
  orderId: number,
  itemId: number
): Promise<void> {
  await api.delete(`/order/${orderId}/item/${itemId}`);
}
