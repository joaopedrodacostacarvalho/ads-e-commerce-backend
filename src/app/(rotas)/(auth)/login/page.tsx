"use client"

import { LoginFormSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Navegation from "../../../components/navegationComponents/navbar.home";
import { useAuth } from "../_AuthContext";


type LoginFormInput = z.infer<typeof LoginFormSchema>;

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");

  const BASE_URL = "http://localhost:3000"

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
  })

  useEffect(() => {
    const subscription = watch(() => {
      if (apiError) {
        setApiError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, apiError]);

  const onSubmit = async (data: LoginFormInput) => {
    let success = false;
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
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
      login(result.token);
      router.push("/");

    } catch (error: any) {
      setApiError(error.message);
    } finally {
      if (success) reset();
    }
  }

  return (
    <>
      <Navegation />
      <Box maxWidth={400} mx="auto" mt={6} >
        <Typography variant="h4" >
          Login
        </Typography>

        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>

          <Typography mt={2}>
            Ainda não tem uma conta? <Button href="/register">Cadastre-se</Button>
          </Typography>
        </form>
      </Box >
    </>
  )
}

