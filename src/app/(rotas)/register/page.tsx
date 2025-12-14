"use client"

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

}

