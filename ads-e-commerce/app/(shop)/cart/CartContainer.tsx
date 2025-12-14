"use client";

import React, { useState, useEffect } from "react";
import { Cart } from "@/services/types";
import { getCart, checkoutCart } from "@/services/cart.service";
import CartItemRow from "@/components/CartItemRow";
import { useRouter } from "next/navigation";

interface CartContainerProps {
  initialCart: Cart;
}

export default function CartContainer({ initialCart }: CartContainerProps) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função para recarregar o carrinho do servidor
  const refetchCart = async () => {
    setLoading(true);
    try {
      const updatedCart = await getCart();
      setCart(updatedCart);
    } catch (e) {
      console.error("Erro ao recarregar carrinho:", e);
      // Aqui você pode adicionar lógica de erro, mas vamos falhar silenciosamente por simplicidade
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await checkoutCart();
      alert("Pedido finalizado com sucesso! Redirecionando...");
      router.push("/order-confirmation"); // Redireciona para uma página de confirmação
    } catch (e: any) {
      alert(e.response?.data?.message || "Erro ao finalizar pedido.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items.length) {
    return (
      <div className="p-6 bg-white shadow rounded-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Seu carrinho está vazio!
        </h1>
        <p className="mt-4 text-gray-500">
          Seus itens foram removidos.{" "}
          <a href="/" className="text-indigo-600 hover:text-indigo-800">
            Comece a comprar
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Seu Carrinho de Compras
      </h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço Unitário
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.items.map((item) => (
              // Passa a função de recarga (refetchCart) para o item
              <CartItemRow key={item.id} item={item} onUpdate={refetchCart} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-full max-w-sm bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Resumo do Pedido
          </h2>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span>Total de Itens:</span>
            <span className="font-semibold">{cart.totalItems}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-4 mt-4">
            <span>Total do Carrinho:</span>
            <span>R$ {cart.total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || cart.total === 0}
            className="mt-6 w-full py-3 px-4 rounded-md text-white font-medium bg-green-600 hover:bg-green-700 disabled:bg-green-400 transition duration-150"
          >
            {loading ? "Finalizando..." : "Finalizar Pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}
