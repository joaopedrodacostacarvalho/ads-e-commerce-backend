"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Paper, Box, Button, CircularProgress, Divider, List, ListItem, ListItemText } from "@mui/material";
import { authStorage } from "../../../(auth)/authStorage";
import { decodeToken } from "../../../(auth)/jwt";

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const token = authStorage.getToken();
    if (token) fetchOrder(token);
  }, [id]);

  const fetchOrder = async (token: string) => {
    try {
      // Endpoint de busca: /order/{id}
      const response = await fetch(`http://localhost:3000/order/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error();
      setOrder(await response.json());
    } catch {
      console.error("Erro ao carregar pedido");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setPaying(true);
    try {
      const token = authStorage.getToken();
      const user = decodeToken(token);

      // O endpoint de pagamento é /order/pay
      const response = await fetch("http://localhost:3000/payament/pay", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: Number(user.sub),
          amount: Number(order?.total_venda || 0)
        })
      });

      if (response.ok) {
        alert("Pagamento processado com sucesso!");
        window.location.reload(); // Recarrega para atualizar status
      } else {
        alert("Erro no pagamento.");
      }
    } catch {
      alert("Falha na comunicação com o servidor.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5">Pedido #{id}</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>Status: {order?.status_pagamento}</Typography>
        <Divider />

        <List>
          {order?.itens?.map((item: any, index: number) => (
            <ListItem key={index}>
              <ListItemText primary={item.produto} secondary={`Quantidade: ${item.quantidade}`} />
              <Typography>R$ {item.subtotal}</Typography>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Total: R$ {order?.total_venda}</Typography>
          {order?.status_pagamento !== "pago" && (
            <Button variant="contained" color="success" onClick={handlePayment} disabled={paying}>
              {paying ? <CircularProgress size={24} color="inherit" /> : "Confirmar Pagamento"}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
