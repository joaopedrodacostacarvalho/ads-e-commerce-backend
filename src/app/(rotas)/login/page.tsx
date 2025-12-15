"use client"

<<<<<<< HEAD
import Link from "next/link";
import { FormEvent, useState } from "react";

interface LoginFormInput {
  email: string,
  password: string,
}

export default function Login() {
  const BASE_URL = "http://localhost:3000"

  const [formData, setFormData] = useState<LoginFormInput>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const respose = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      if (!respose.ok) {
        const errorData = await respose.json();
        console.error(`HTTP error! status: ${respose.status}, message: ${errorData.message}`);
        throw new Error(errorData.message);
      }

      const data = await respose.json();
      localStorage.setItem("token", data.token);
      const token = localStorage.getItem("token");
      console.log(token);
    } catch (error) {
      setError(`Houve um problema ao fazer o login: ${error}`);
    } finally {
      setFormData({
        email: "",
        password: ""
      })
    }
  };

  return (
    <section>
      <h1>Pagina de LOGIN!</h1>
      <h2>Ir para pagina register: <Link href="/register"> ir </Link></h2>
      <h2>Ir para pagina Home: <Link href="/"> ir </Link></h2>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Digite seu email"
          required
        />
        <label htmlFor="password">Senha: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="********"
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
=======
import { LoginFormSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

type LoginFormInput = z.infer<typeof LoginFormSchema>;

export default function Login() {
  const router = useRouter();
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
      console.log(result);
      localStorage.setItem("token", result.token);
      router.push("/");
    } catch (error: any) {
      setApiError(error.message);
    } finally {
      if (success) reset();
    }
  }

  return (
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
>>>>>>> front-developer
  )
}
