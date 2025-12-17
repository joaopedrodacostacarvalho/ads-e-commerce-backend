"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer, Box, Typography, Divider, Button, CircularProgress
} from "@mui/material";
import { useCart } from "../../context/_CartContext";
import { authStorage } from "../../(rotas)/(auth)/authStorage";

export default function CartDrawer({ open, onClose }: any) {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const token = authStorage.getToken();

      // Conforme o Swagger, o endpoint de criação é /order/create
      const response = await fetch("http://localhost:3000/order/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        // O Swagger não pede body para criar a partir do carrinho, enviamos vazio
        body: JSON.stringify({})
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro ao criar pedido.");
      }

      const orderData = await response.json();
      onClose();

      // Redireciona usando o ID retornado (ex: orderData.id)
      router.push(`/pedido/${orderData.id}`);

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const total = cart?.items.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0) || 0;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
        <Typography variant="h6" gutterBottom>Meu Carrinho</Typography>
        <Divider />
        <Box sx={{ flex: 1, mt: 2 }}>
          {cart?.items.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">{item.name}</Typography>
              <Typography variant="body2">{item.quantity}x R$ {item.price}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ borderTop: "1px solid #eee", pt: 2 }}>
          <Typography variant="h6" mb={2}>Total: R$ {total.toFixed(2)}</Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCheckout}
            disabled={loading || cart?.items.length === 0}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Finalizar Pedido"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
