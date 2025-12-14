// Rota: /checkout (Início do fluxo de pagamento/pedido)
"use client";

import { createOrder } from "@/services/order.service";
import { clearCart } from "@/services/cart.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateOrderAndPay = async () => {
    setLoading(true);
    try {
      // Supondo que você obtém o userId de algum estado global ou token
      const mockUserId = 1; // Substitua pela lógica real

      // 1. Criar o Pedido no Backend
      const newOrder = await createOrder({ userId: mockUserId });

      // 2. Simular o Processo de Pagamento (NÃO IMPLEMENTADO NO SWAGGER)
      // Aqui você chamaria um endpoint de pagamento (e.g., /payment/pay)

      // 3. Limpar Carrinho (Se o pagamento for bem-sucedido)
      await clearCart();

      alert(
        `Pedido #${newOrder.id} criado com sucesso! Redirecionando para a confirmação.`
      );
      router.push(`/checkout/success?orderId=${newOrder.id}`);
    } catch (error: any) {
      console.error("Erro no checkout:", error);
      alert(
        error.response?.data?.message ||
          "Falha ao finalizar o pedido. Verifique seu carrinho e login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Finalizar Pedido (Checkout)</h2>
      <p>1. Revisão do Carrinho (Mock)</p>
      <p>2. Seleção de Endereço de Entrega (Mock)</p>
      <p>3. Seleção de Método de Pagamento (Mock)</p>

      <div
        style={{ border: "1px solid #ccc", padding: "20px", marginTop: "30px" }}
      >
        <h3>Total a Pagar: R$ XXX.XX</h3>
        <button
          onClick={handleCreateOrderAndPay}
          disabled={loading}
          style={{
            padding: "15px 30px",
            backgroundColor: loading ? "gray" : "darkorange",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "Processando Pagamento..." : "Criar Pedido e Pagar"}
        </button>
        <p style={{ marginTop: "10px", fontSize: "12px" }}>
          *Esta é uma simulação da chamada API `createOrder`.
        </p>
      </div>
    </div>
  );
}
