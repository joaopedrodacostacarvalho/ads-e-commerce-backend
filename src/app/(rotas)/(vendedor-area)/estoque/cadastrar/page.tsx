"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Box, Typography, Container, Alert, Divider, Paper,
  TextField, Button, Grid, CircularProgress, IconButton,
  MenuItem,
} from "@mui/material";

// Importamos o Schema que definimos anteriormente
import { ProductFormSchema, ProductFormData } from "../../(product)/productSchema";
import { useAuth } from "../../../(auth)/_AuthContext";
import { authStorage } from "../../../(auth)/authStorage";
import Navegation from "../../../../components/navegationComponents/navbar.home";

export default function CreateProductPage() {
  const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: 0,
    }
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const token = authStorage.getToken();
        const response = await fetch("http://localhost:3000/category", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Erro ao carregar categorias");
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    setStatus(null);
    const token = authStorage.getToken();

    try {
      // --- PASSO 1: Criar o Produto (JSON) ---
      const response = await fetch("http://localhost:3000/product/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erro ao criar produto.");
      }

      const newProduct = await response.json();
      const productId = newProduct.id;

      // --- PASSO 2: Upload da Imagem (Se houver arquivo selecionado) ---
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const imageResponse = await fetch(`http://localhost:3000/product/${productId}/upload-image`, {
          method: "PATCH", // Ajuste para PATCH ou POST conforme seu backend
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });

        if (!imageResponse.ok) throw new Error("Produto criado, mas falha no upload da imagem.");
      }

      setStatus({ type: 'success', text: "Produto cadastrado com sucesso! Redirecionando..." });

      // Redireciona de volta para a lista após 2 segundos
      setTimeout(() => router.push("/estoque"), 2000);

    } catch (err: any) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  if (!user || user.role !== "vendedor") {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">Acesso negado. Apenas vendedores podem cadastrar produtos.</Alert>
      </Container>
    );
  }

  return (
    <>
      <Navegation />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <AddBoxIcon color="primary" fontSize="large" />
          <Typography variant="h4" fontWeight="bold">Novo Produto</Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {status && (
          <Alert severity={status.type} sx={{ mb: 3 }}>{status.text}</Alert>
        )}

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Nome do Produto */}
              <Grid size={{ xs: 12 }} >
                <TextField
                  fullWidth
                  label="Nome do Produto"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              {/* Descrição */}
              <Grid size={{ xs: 12 }} >
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Descrição (Opcional)"
                  {...register("description")}
                />
              </Grid>

              {/* Preço */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Preço (R$)"
                  {...register("price")}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  // Forma atualizada de passar atributos ao input nativo
                  slotProps={{
                    htmlInput: {
                      step: "0.01",
                      min: "0"
                    },
                  }}
                />
              </Grid>

              {/* Estoque */}
              <Grid size={{ xs: 12, sm: 4 }} >
                <TextField
                  fullWidth
                  type="number"
                  label="Estoque Inicial"
                  {...register("stock")}
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }} >
                <TextField
                  select // Transforma o TextField em um Select
                  fullWidth
                  label="Categoria"
                  defaultValue=""
                  {...register("categoryId")}
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                  disabled={loadingCategories}
                >
                  {loadingCategories ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} /> Carregando...
                    </MenuItem>
                  ) : (
                    categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </Grid>

              {/* Upload de Imagem */}
              {/*<Grid item xs={12}>
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: '#fafafa',
                    cursor: 'pointer'
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CloudUploadIcon sx={{ fontSize: 40, color: 'action.active', mb: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    Clique para selecionar a imagem do produto
                  </Typography>
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        // Opcional: Adicionar lógica para mostrar o nome do arquivo selecionado
                      }
                    }}
                  />
                </Box>
              </Grid>*/}
              <Grid size={{ xs: 12 }} >
                <TextField
                  fullWidth
                  label="URL da Imagem (Ex: https://site.com/foto.jpg)"
                  {...register("imageUrl")}
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message}
                />
              </Grid>

              <Grid size={{ xs: 12 }} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Finalizar Cadastro"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}
