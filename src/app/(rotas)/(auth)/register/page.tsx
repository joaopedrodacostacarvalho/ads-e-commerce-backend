"use client"

import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "./registerSchema";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import Navegation from "../../../components/navegationComponents/navbar.home";
import { useAuth } from "../_AuthContext";


type RegisterFormInput = z.infer<typeof RegisterFormSchema>;

export default function Register() {
  const { user } = useAuth();
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const BASE_URL = "http://localhost:3000"

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(RegisterFormSchema),
  });

  useEffect(() => {
    const subscription = watch(() => {
      if (apiError) {
        setApiError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, apiError]);

  // Checa se o usuário está logado, se sim vai pra home
  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  // Evita de renderizar (tbm pode ser usado para esconder melhor conteúdo protegido)
  if (user) return null;

  const onSubmit = async (data: RegisterFormInput) => {
    try {
      // Create user
      const userResponse = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.user),
      });

      if (!userResponse.ok) {
        const error = await userResponse.json();
        throw new Error(error.message || "Erro ao criar usuário");
      }

      const userResult = await userResponse.json();
      const userId = userResult.id;

      // Create address with userId
      const addressResponse = await fetch(`${BASE_URL}/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: userId,
          ...data.address,
          userId,
        }),
      });

      if (!addressResponse.ok) {
        const error = await addressResponse.json();
        throw new Error(error.message || "Erro ao criar endereço");
      }

      reset();
      router.push("/login");

    } catch (error: any) {
      setApiError(error.message);
    }
  };

  return (
    <>
      <Navegation />
      <Box maxWidth={400} mx="auto" mt={6}>
        <Typography variant="h4">
          Cadastro
        </Typography>

        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            {...register("user.name")}
            error={!errors.user?.name}
            helperText={errors.user?.name?.message}
            required
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("user.email")}
            error={!errors.user?.email}
            helperText={errors.user?.email?.message}
            required
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register("user.password")}
            error={!errors.user?.password}
            helperText={errors.user?.password?.message}
            required
          />

          <TextField
            label="Telefone"
            fullWidth
            margin="normal"
            {...register("user.phone")}
            error={!errors.user?.phone}
            helperText={errors.user?.phone?.message}
          />

          <FormControl>
            <FormLabel>Tipo de conta</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="consumidor"
                control={<Radio />}
                label="Consumidor"
                {...register("user.role")}
              />
              <FormControlLabel
                value="vendedor"
                control={<Radio />}
                label="Vendedor"
                {...register("user.role")}
              />
            </RadioGroup>
            <Typography color="error" variant="caption">
              {errors.user?.role?.message}
            </Typography>
          </FormControl>

          <Typography variant="h6" mt={3}>
            Endereço
          </Typography>

          <TextField
            label="Rua"
            fullWidth
            margin="normal"
            {...register("address.street")}
            error={!!errors.address?.street}
            helperText={errors.address?.street?.message}
          />

          <TextField
            label="Número"
            fullWidth
            margin="normal"
            {...register("address.number")}
            error={!!errors.address?.number}
            helperText={errors.address?.number?.message}
          />

          <TextField
            label="Complemento"
            fullWidth
            margin="normal"
            {...register("address.complement")}
          />

          <TextField
            label="Cidade"
            fullWidth
            margin="normal"
            {...register("address.city")}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
          />

          <TextField
            label="Estado"
            fullWidth
            margin="normal"
            {...register("address.state")}
            error={!!errors.address?.state}
            helperText={errors.address?.state?.message}
          />

          <TextField
            label="CEP"
            fullWidth
            margin="normal"
            {...register("address.zipCode")}
            error={!!errors.address?.zipCode}
            helperText={errors.address?.zipCode?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Typography mt={2}>
            Já possui umaconta? <Button href="/login">Faça login</Button>
          </Typography>
        </form>
      </Box>
    </>
  )
}


