"use client";

import { useState } from "react";
import { addToCart } from "@/services/cart.service";

export default function AddToCartButton({
  productId,
  stock,
  isActive,
}: {
  productId: number;
  stock: number;
  isActive: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await addToCart({ productId, quantity });
      alert("Produto adicionado ao carrinho!");
    } catch (error: any) {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      } else {
        alert("Erro ao adicionar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isActive) {
    return (
      <div className="p-3 bg-red-100 text-red-700 rounded">
        Produto Indisponível
      </div>
    );
  }

  if (stock <= 0) {
    return (
      <div className="p-3 bg-yellow-100 text-yellow-700 rounded">
        Sem Estoque
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <div className="flex items-center gap-2">
        <label htmlFor="qty" className="font-medium text-gray-700">
          Qtd:
        </label>
        <input
          id="qty"
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.min(stock, Math.max(1, parseInt(e.target.value) || 1))
            )
          }
          className="border border-gray-300 rounded px-2 py-1 w-20"
        />
        <span className="text-xs text-gray-500">Max: {stock}</span>
      </div>
      <button
        onClick={handleAdd}
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
      >
        {loading ? "Adicionando..." : "Adicionar ao Carrinho"}
      </button>
    </div>
  );
}
