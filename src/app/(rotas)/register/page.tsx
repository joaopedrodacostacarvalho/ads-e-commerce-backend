"use client"

<<<<<<< HEAD
import Link from "next/link";
import { useState, FormEvent } from "react";


interface RegisterFormInput {
  email: string,
  password: string,
  name: string,
  phone: string,
  role: string,
}

export default function Register() {
  const BASE_URL = "http://localhost:3000"

  const [formData, setFormData] = useState<RegisterFormInput>({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`onSubmit com data: ${JSON.stringify(formData)}`);

    setError("");
    try {
      const respose = await fetch(`${BASE_URL}/auth/register`, {
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
      console.log(data);

    } catch (error) {
      setError(`Houve um problema ao fazer o cadastro: ${error}`);
    } finally {
      setFormData({
        email: "",
        name: "",
        password: "",
        phone: "",
        role: "",
      })
    }
  };
  return (
    <section>
      <h1>Pagina de Register!</h1>
      <h2>HOME: Ir para pagina Home: <Link href="/"> ir </Link></h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="name">Nome: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Seu nome completo"
          required
        />
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
        <label htmlFor="phone">Telefone: </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+55 11 4001-8922"
        />
        <label htmlFor="role">Tipo de conta: </label>
        <p>
          <input
            type="radio"
            id="consumidor"
            name="role"
            value="consumidor"
            onChange={handleInputChange}
            required
          />
          Consumidor
          <input
            type="radio"
            id="vendedor"
            name="role"
            value="vendedor"
            onChange={handleInputChange}
            required
          />
          Vendedor
        </p>
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já possui uma conta? <Link href="/login">Faça login</Link> </p>
    </section>
  )

=======
import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "./registerSchema";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';


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
  )
>>>>>>> front-developer
}

