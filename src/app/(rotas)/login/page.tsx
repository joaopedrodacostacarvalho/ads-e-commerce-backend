"use client"

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

    console.log(`onSubmit com data: email: ${formData.email} senha: ${formData.password}`);

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
      console.log(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setError(`Houve um problema ao fazer o login: ${error}`);
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
  )
}
