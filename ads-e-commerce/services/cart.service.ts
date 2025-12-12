import api from "./api";
import { Cart, CartItemReq, CartItemUpdate } from "./types";

/**
 * Endpoint: GET /cart/mycarts
 * Sumário: Trazer carrinho do usuario (consumidor) logado. (Requer JWT)
 */
export async function getMyCart(): Promise<Cart> {
  const response = await api.get<Cart>("/cart/mycarts");
  return response.data;
}

/**
 * Endpoint: DELETE /cart/clear
 * Sumário: Limpa o carrinho do usuário logado. (Requer JWT)
 */
export async function clearCart(): Promise<void> {
  await api.delete("/cart/clear");
}

// --- CartItem Endpoints ---

/**
 * Endpoint: POST /cartitem/add
 * Sumário: Adiciona um cartItem ao cart. (Requer JWT)
 */
export async function addToCart(data: CartItemReq): Promise<any> {
  // Tipo de retorno 'any' pois CartItem é vazio no Swagger
  const response = await api.post("/cartitem/add", data);
  return response.data;
}

/**
 * Endpoint: PATCH /cartitem/quantity
 * Sumário: Atualizar quantidade de um item do carrinho. (Requer JWT)
 */
export async function updateCartItemQuantity(
  data: CartItemUpdate
): Promise<any> {
  // Tipo de retorno 'any'
  const response = await api.patch("/cartitem/quantity", data);
  return response.data;
}

/**
 * Endpoint: DELETE /cartitem/{cartItemId}
 * Sumário: Remover um item do carrinho. (Requer JWT)
 */
export async function removeItemFromCart(cartItemId: number): Promise<void> {
  await api.delete(`/cartitem/${cartItemId}`);
}
