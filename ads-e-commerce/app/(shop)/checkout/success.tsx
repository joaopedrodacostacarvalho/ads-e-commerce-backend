// Rota: /checkout/success
import { findOneOrder } from "@/services/order.service";
import { Order } from "@/services/types";
import { notFound } from "next/navigation";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  const orderId = parseInt(searchParams.orderId);

  if (isNaN(orderId)) {
    notFound();
  }

  let order: Order;
  try {
    order = await findOneOrder(orderId);
  } catch (error) {
    notFound();
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#f0fdf4",
        borderRadius: "8px",
        border: "1px solid #dcfce7",
      }}
    >
      <h1 style={{ color: "#16a34a" }}>Pedido Realizado com Sucesso!</h1>
      <p style={{ fontSize: "1.2em", margin: "20px 0" }}>
        Obrigado por sua compra! Seu pedido **#{order.id}** foi confirmado.
      </p>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "4px",
          display: "inline-block",
          textAlign: "left",
        }}
      >
        <p>
          <strong>Status Atual:</strong>{" "}
          <span style={{ color: "blue" }}>{order.status}</span>
        </p>
        <p>
          <strong>Total Pago:</strong> R$ {order.total.toFixed(2)}
        </p>
        <p>
          <strong>Data do Pedido:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <a
          href="/account/orders"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        >
          Ver Meus Pedidos
        </a>
        <a
          href="/"
          style={{
            padding: "10px 20px",
            backgroundColor: "#d1d5db",
            color: "#1f2937",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Voltar à Home
        </a>
      </div>
    </div>
  );
}
