"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../(auth)/_AuthContext";
import { authStorage } from "../../(auth)/authStorage";
import Navegation from "../../../components/navegationComponents/navbar.home";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box, CircularProgress, Typography, Container, Alert, Divider,
  Paper, TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, IconButton, Tooltip, Avatar,
  Button
} from "@mui/material";
import Link from "next/link";

export default function InventoryPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  // Estados para gerenciar a edição local
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempStock, setTempStock] = useState<number>(0);

  useEffect(() => {
    if (user && user?.role === "vendedor") {
      fetchProducts();
    }
  }, [user]);

  const handleDelete = async (id: number) => {
    // Confirmação simples do navegador
    const confirmDelete = window.confirm("Tem certeza que deseja desativar este produto?");

    if (!confirmDelete) return;

    try {
      const token = authStorage.getToken();
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) throw new Error("Erro ao desativar o produto");

      // Atualiza a lista removendo o produto desativado
      setProducts((prev) => prev.filter((p) => p.id !== id));

      // Opcional: Mostrar um alerta de sucesso
      alert("Produto desativado com sucesso.");

    } catch (err: any) {
      setError("Não foi possível desativar o produto.");
    }
  };

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const token = authStorage.getToken();
      const response = await fetch("http://localhost:3000/product/myproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Falha ao carregar produtos");

      const result = await response.json();
      const data = result.data;
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateStock = async (id: number) => {
    const originalProduct = products.find(p => p.id === id);

    if (originalProduct && Number(originalProduct.stock) === Number(tempStock)) {
      console.log("Valores iguais. Fetch cancelado.");
      setEditingId(null);
      return; // Encerra a função aqui sem fazer o fetch
    }

    try {
      const token = authStorage.getToken();
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ stock: tempStock }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar estoque");

      // Atualiza a lista localmente para refletir a mudança
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: tempStock } : p))
      );
      setEditingId(null);
    } catch (err: any) {
      setError("Não foi possível atualizar o estoque.");
    }
  };

  if (!user || user.role !== "vendedor") {
    return (
      <>
        <Navegation />
        <Container sx={{ mt: 5 }}>
          <Alert severity="error" variant="filled">
            Acesso Negado. Esta página é exclusiva para <strong>Vendedores</strong>.
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navegation />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <InventoryIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="h4" fontWeight="bold">Gestão de Estoque</Typography>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            </Box>
          </Box>

          {/* Botão de Redirecionamento */}
          <Link href="/estoque/cadastrar" passHref style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 2, px: 3, py: 1 }}
            >
              Novo Produto
            </Button>
          </Link>
        </Box>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          Vendedor: {user.email}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell width={80}>Foto</TableCell>
                <TableCell>Produto</TableCell>
                <TableCell align="center">Estoque Atual</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    Nenhum produto encontrado em seu catálogo.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Avatar
                        src={product.imageUrl}
                        variant="rounded"
                        sx={{ width: 45, height: 45 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {product.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {editingId === product.id ? (
                        <TextField
                          type="number"
                          size="small"
                          variant="standard"
                          value={tempStock}
                          onChange={(e) => setTempStock(Number(e.target.value))}
                          sx={{ width: 60 }}
                          autoFocus
                        />
                      ) : (
                        <Typography
                          color={product.stock < 5 ? "error" : "inherit"}
                          fontWeight={product.stock < 5 ? "bold" : "normal"}
                        >
                          {product.stock}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      R$ {Number(product.price).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      {editingId === product.id ? (
                        <Tooltip title="Salvar">
                          <IconButton color="success" onClick={() => handleUpdateStock(product.id)}>
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Editar Estoque">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setEditingId(product.id);
                              setTempStock(product.stock);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Desativar Produto">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(product.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
