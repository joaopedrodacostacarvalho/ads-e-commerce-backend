import api from "./api";
import { Cart, CartItem, AddToCartDto } from "./types";

/**
 * Busca os detalhes do carrinho de compras do usuário autenticado.
 * Assumindo que o servidor retorna o carrinho ativo como o primeiro item da lista.
 * @returns O objeto Cart completo.
 */
export async function getCart(): Promise<Cart> {
  // Chamada espera um array de carrinhos, conforme a rota /mycarts sugere.
  const { data: carts } = await api.get<Cart[]>("/cart/mycarts");

  if (!carts || carts.length === 0) {
    // Lançar um erro para que a página saiba que o carrinho não existe
    throw new Error("Carrinho ativo não encontrado ou vazio.");
  }

  // Retorna o primeiro (e presumivelmente ativo) carrinho
  return carts[0];
}

/**
 * Adiciona um produto ao carrinho ou aumenta sua quantidade.
 * @param dto Dados do produto e quantidade.
 * @returns O objeto Cart atualizado.
 */
export async function addToCart(dto: AddToCartDto): Promise<Cart> {
  const { data } = await api.post<Cart>("/cartitem/add", dto);
  return data;
}

/**
 * Atualiza a quantidade de um item específico no carrinho.
 * @param cartItemId ID do item do carrinho.
 * @param quantity Nova quantidade.
 * @returns O objeto CartItem atualizado.
 */
export async function updateCartItemQuantity(
  cartItemId: number,
  quantity: number
): Promise<CartItem> {
  // A rota é mais provável ser um PATCH no ID do item.
  const { data } = await api.patch<CartItem>(`/cartitem/${cartItemId}`, {
    quantity,
  });
  return data;
}

/**
 * Remove um item específico do carrinho, utilizando seu ID de item.
 * @param cartItemId ID do item do carrinho a ser removido.
 * @returns O objeto Cart atualizado.
 */
export async function removeItemFromCart(cartItemId: number): Promise<Cart> {
  // A rota é mais provável ser um DELETE no ID do item.
  const { data } = await api.delete<Cart>(`/cartitem/${cartItemId}`);
  return data;
}

/**
 * Finaliza o carrinho e inicia o processo de checkout/pagamento.
 * @returns Informações sobre o pedido criado.
 */
export async function checkoutCart(): Promise<any> {
  // Mantido o endpoint de checkout, já que a rota /order é separada
  const { data } = await api.post("/order/checkout");
  return data;
}
