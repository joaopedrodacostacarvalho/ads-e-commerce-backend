"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../(auth)/_AuthContext";
import { authStorage } from "../../(auth)/authStorage";
import Navegation from "../../../components/navegationComponents/navbar.home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Box, CircularProgress, Typography, Container, Alert, Divider, Paper, Accordion, AccordionSummary, Chip, AccordionDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function SalesHistoryPage() {
  const { user } = useAuth();
  const [sales, setSales] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Só dispara o fetch se o carregamento inicial acabou e o user é vendedor
    if (user && user?.role === "vendedor") {
      fetchSales();
    }
  }, [user]);

  const fetchSales = async () => {
    setIsFetching(true);
    try {
      const token = authStorage.getToken();
      const response = await fetch("http://localhost:3000/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Falha ao carregar vendas");

      const data = await response.json();
      setSales(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };


  if (!user || user.role !== "vendedor") {
    return (
      <>
        <Navegation />
        <Container sx={{ mt: 5 }}>
          <Alert severity="error" variant="filled">
            Acesso Negado. Você precisa estar logado como <strong>Vendedor</strong>.
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navegation />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <ShoppingBagIcon color="primary" fontSize="large" />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Histórico de Vendas
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          Vendedor: {user.email}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {isFetching && <CircularProgress size={24} sx={{ mb: 2 }} />}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {sales.length === 0 && !isFetching && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fafafa' }}>
            <Typography color="text.secondary">Nenhuma venda confirmada encontrada.</Typography>
          </Paper>
        )}

        {/* Lista de Vendas usando Accordions */}
        {sales.map((order) => (
          <Accordion key={order.order_id} elevation={2} sx={{ mb: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2, alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Pedido #{order.order_id}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Data: {new Date(order.data_venda).toLocaleDateString('pt-BR')}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Chip label={order.status_pagamento} color="success" size="small" variant="outlined" sx={{ mb: 1 }} />
                  <Typography variant="h6" color="primary">
                    R$ {order.total_venda_vendedor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#f9f9f9' }}>
                    <TableRow>
                      <TableCell><strong>Produto</strong></TableCell>
                      <TableCell align="right"><strong>Qtd</strong></TableCell>
                      <TableCell align="right"><strong>Subtotal</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.itens.map((item: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{item.produto}</TableCell>
                        <TableCell align="right">{item.quantidade}</TableCell>
                        <TableCell align="right">R$ {item.subtotal.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </>
  );
}
