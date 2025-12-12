"use client";

import {
  getMyCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
} from "@/services/cart.service";
import { Cart } from "@/services/types";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Tipo de CartItem (simplificado, já que o schema está vazio, assumimos a estrutura de um carrinho)
type CartItemDisplay = {
  id: number;
  product: { id: number; name: string; price: number; imageUrl: string };
  quantity: number;
  subtotal: number;
};

// Estrutura do Carrinho assumida
type CartDisplay = {
  id: number;
  items: CartItemDisplay[];
  total: number;
  totalItems: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      // Assumimos que o endpoint retorna a estrutura necessária
      const response = await getMyCart();
      setCart(response.data as unknown as CartDisplay); // Forçando o cast devido ao schema vazio
    } catch (error: any) {
      // Se o erro for 401 ou 403, pode não estar logado
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Você precisa estar logado para ver seu carrinho.");
        router.push("/login");
      } else {
        console.error("Erro ao buscar carrinho:", error);
        setCart(null); // Limpa o carrinho em caso de erro
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) return handleRemoveItem(cartItemId);

    try {
      await updateCartItemQuantity({ cartItemId, quantity: newQuantity });
      fetchCart(); // Recarrega o carrinho
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      alert("Não foi possível atualizar a quantidade.");
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeItemFromCart(cartItemId);
      fetchCart(); // Recarrega o carrinho
    } catch (error) {
      console.error("Erro ao remover item:", error);
      alert("Não foi possível remover o item.");
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Tem certeza que deseja limpar o carrinho?")) return;
    try {
      await clearCart();
      fetchCart(); // Recarrega o carrinho
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      alert("Não foi possível limpar o carrinho.");
    }
  };

  if (loading) return <div>Carregando seu carrinho...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <h2>Seu Carrinho</h2>
        <p>Seu carrinho está vazio.</p>
        <a href="/products">Continue comprando</a>
      </div>
    );
  }

  return (
    <div>
      <h2>Meu Carrinho ({cart.totalItems} itens)</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {cart.items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #eee",
              padding: "15px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div style={{ flexGrow: 1 }}>
              <h4>{item.product.name}</h4>
              <p>Preço unitário: R$ {item.product.price.toFixed(2)}</p>
              <p>Subtotal: R$ {item.subtotal.toFixed(2)}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label htmlFor={`qty-${item.id}`}>Qtd:</label>
              <input
                id={`qty-${item.id}`}
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  handleUpdateQuantity(item.id, parseInt(e.target.value))
                }
                style={{ width: "50px", padding: "5px" }}
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  padding: "8px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          borderTop: "2px solid #333",
          paddingTop: "15px",
        }}
      >
        <h3>
          Total do Carrinho:{" "}
          <span style={{ color: "darkgreen" }}>R$ {cart.total.toFixed(2)}</span>
        </h3>
        <button
          onClick={() => router.push("/checkout")}
          style={{
            padding: "15px 30px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            marginRight: "10px",
          }}
        >
          Finalizar Compra
        </button>
        <button
          onClick={handleClearCart}
          style={{
            padding: "15px 30px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
          }}
        >
          Limpar Carrinho
        </button>
      </div>
    </div>
  );
}
