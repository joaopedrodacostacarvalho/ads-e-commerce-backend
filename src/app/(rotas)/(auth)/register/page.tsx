"use client"

import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "./registerSchema";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import Navegation from "../../../components/navegationComponents/navbar.home";


type RegisterFormInput = z.infer<typeof RegisterFormSchema>;

export default function Register() {
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

  const onSubmit = async (data: RegisterFormInput) => {
    let success = false;
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao realizar login");
      }

      const result = await response.json();
      success = true;
      console.log(result);
      router.push("/login");

    } catch (error) {
      setApiError(error.message);
    } finally {
      if (success) reset();
    }
  }

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
          {...register("name")}
          error={!errors.name}
          helperText={errors.name?.message}
          required
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!errors.email}
          helperText={errors.email?.message}
          required
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!errors.password}
          helperText={errors.password?.message}
          required
        />

        <TextField
          label="Telefone"
          fullWidth
          margin="normal"
          {...register("phone")}
          error={!errors.phone}
          helperText={errors.phone?.message}
        />

        <FormControl>
          <FormLabel>Tipo de conta</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value="consumidor"
              control={<Radio />}
              label="Consumidor"
              {...register("role")}
            />
            <FormControlLabel
              value="vendedor"
              control={<Radio />}
              label="Vendedor"
              {...register("role")}
            />
          </RadioGroup>
          <Typography color="error" variant="caption">
            {errors.role?.message}
          </Typography>
        </FormControl>

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

