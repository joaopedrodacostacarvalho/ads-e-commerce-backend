("use client");

import { addToCart } from "@/services/cart.service";
import { useState } from "react";

export default function AddToCartButton({
  productId,
  stock,
}: {
  productId: number;
  stock: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleAddToCart = async () => {
    if (quantity <= 0 || quantity > stock) {
      alert("Quantidade inválida.");
      return;
    }
    setStatus("loading");
    try {
      await addToCart({ productId, quantity });
      setStatus("success");
      alert(
        `${quantity} unidade(s) de ${productId} adicionada(s) ao carrinho!`
      );
    } catch (error) {
      setStatus("error");
      console.error(error);
      alert("Erro ao adicionar produto ao carrinho. Você está logado?");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <label htmlFor="quantity">Quantidade:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        min="1"
        max={stock}
        onChange={(e) =>
          setQuantity(Math.min(stock, parseInt(e.target.value) || 1))
        }
        style={{ width: "60px", marginRight: "10px", padding: "5px" }}
      />
      <button
        onClick={handleAddToCart}
        disabled={status === "loading" || stock === 0}
        style={{
          padding: "10px 20px",
          backgroundColor: stock > 0 ? "blue" : "gray",
          color: "white",
          border: "none",
        }}
      >
        {stock === 0
          ? "Fora de Estoque"
          : status === "loading"
          ? "Adicionando..."
          : "Adicionar ao Carrinho"}
      </button>
      {status === "success" && (
        <span style={{ color: "green", marginLeft: "10px" }}>
          Adicionado!
        </span>
      )}
      {status === "error" && (
        <span style={{ color: "red", marginLeft: "10px" }}>Falha!</span>
      )}
    </div>
  );
}
