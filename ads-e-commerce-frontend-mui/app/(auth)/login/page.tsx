"use client"

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const BASE_URL = "http://localhost:3000"
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Erro se algum estiver vazio 
    if (email.trim() == "" || password.trim() == "") {
      setError("Digite o seu email e seha, por favor!");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }

      const result = await response.json();
      console.log(result);
      setSuccess("Login efetuado.");
    } catch (error) {
      setError("Erro ao fazer login.");
      console.error(error);
    }
  }

  return (
    <section>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a> </p>
      </div>
    </section>
  );
}
