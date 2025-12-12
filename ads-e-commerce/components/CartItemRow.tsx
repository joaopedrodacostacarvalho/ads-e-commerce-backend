"use client";

import React, { useState } from "react";
import { CartItem } from "@/services/types";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/services/cart.service";

interface CartItemRowProps {
  item: CartItem;
  // Função de callback para recarregar o carrinho após uma alteração
  onUpdate: () => void;
}

export default function CartItemRow({ item, onUpdate }: CartItemRowProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemove = async () => {
    if (
      !window.confirm(
        `Tem certeza que deseja remover ${item.product.name} do carrinho?`
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      // 💡 CHAMADA CORRIGIDA
      await removeItemFromCart(item.id);
      onUpdate(); // Recarrega o carrinho
    } catch (e) {
      console.error("Erro ao remover item:", e);
      alert("Não foi possível remover o item do carrinho.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (newQty: number) => {
    if (newQty < 1 || newQty === quantity) return;

    setLoading(true);
    setQuantity(newQty); // Atualiza o estado local temporariamente

    try {
      await updateCartItemQuantity(item.id, newQty);
      onUpdate(); // Recarrega para obter os totais atualizados
    } catch (e) {
      console.error("Erro ao atualizar quantidade:", e);
      alert("Não foi possível atualizar a quantidade.");
      setQuantity(item.quantity); // Reverte o estado local em caso de falha
    } finally {
      setLoading(false);
    }
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <tr className={`border-b ${loading ? "opacity-50" : ""}`}>
      <td className="p-4 flex items-center">
        {item.product.imageUrl && (
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded mr-4"
          />
        )}
        <div className="font-medium text-gray-900">{item.product.name}</div>
      </td>
      <td className="p-4 text-center">R$ {item.product.price.toFixed(2)}</td>
      <td className="p-4 text-center">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          className="w-16 border rounded text-center"
          disabled={loading}
        />
      </td>
      <td className="p-4 text-center font-semibold">
        R$ {subtotal.toFixed(2)}
      </td>
      <td className="p-4 text-center">
        <button
          onClick={handleRemove}
          disabled={loading}
          className="text-red-600 hover:text-red-900 disabled:text-gray-400"
        >
          {loading ? "Removendo..." : "Remover"}
        </button>
      </td>
    </tr>
  );
}
