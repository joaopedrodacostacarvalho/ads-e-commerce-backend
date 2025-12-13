"use client"

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
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
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone: phone,
          role: role,
        })
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }

      const result = await response.json();
      console.log(result);
      setSuccess("Cadastro efetuado.");
    } catch (error) {
      setError("Erro ao fazer cadastro.");
      console.error(error);
    }
  }

  return (
    <section>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>
          <input id="name" name="name" type="text" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="phone">Telefone</label>
          <input id="phone" name="phone" type="tel" placeholder="81 9999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <input id="role-vendedor" name="role" type="radio" value="vendedor" onChange={(e) => setRole(e.target.value)} required />
          <label htmlFor="role">Vendedor</label>
          <input id="role-cliente" name="role" type="radio" value="consumidor" onChange={(e) => setRole(e.target.value)} required />
          <label htmlFor="role">Cliente</label>
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Já possui uma conta? <a href="/login">Faça o login</a> </p>
      </div>
    </section >
  );
}
