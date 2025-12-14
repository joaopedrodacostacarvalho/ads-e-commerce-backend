import React from "react";
import { getCart } from "@/services/cart.service";
import { redirect } from "next/navigation";
import CartContainer from "./CartContainer";
import { Cart } from "@/services/types";

export const dynamic = "force-dynamic"; // Garante que a requisição é feita a cada acesso

export default async function CartPage() {
  let cart: Cart | null = null;
  let error: string | null = null;

  try {
    cart = await getCart();
  } catch (e: any) {
    if (e.response?.status === 401) {
      // Usuário não autenticado, redireciona para login
      redirect("/login?redirect=/cart");
    }
    console.error("Erro ao buscar carrinho:", e);
    error = "Não foi possível carregar seu carrinho. Tente novamente.";
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h1 className="text-2xl font-bold text-red-800">
          Erro ao Carregar Carrinho
        </h1>
        <p className="mt-2 text-red-600">{error}</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-6 bg-white shadow rounded-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Seu carrinho está vazio!
        </h1>
        <p className="mt-4 text-gray-500">
          Parece que você ainda não adicionou produtos.
          <a href="/" className="text-indigo-600 hover:text-indigo-800">
            {" "}
            Comece a comprar
          </a>
          .
        </p>
      </div>
    );
  }

  // Renderiza o container que lida com o estado cliente
  return <CartContainer initialCart={cart} />;
}
