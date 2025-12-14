"use client"

import { FormEvent, useActionState, useState } from "react";
import { cadastro } from "../actions";

export default function CadastroForm() {
  const [state, action, pending] = useActionState(cadastro, undefined);

  return (
    <section>
      <form action={action}>
        <div>
          <label htmlFor="name">Nome</label>
          <input id="name" name="name" type="text" placeholder="Seu nome completo" required />
        </div>
        {state?.errors?.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" required />
        </div>
        {state?.errors?.email && <p style={{ color: "red" }}>{state.errors.email}</p>}
        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" placeholder="********" required />
        </div>
        {state?.errors?.password && (
          <div style={{ color: "red" }}>
            <p>A senha deve ter:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label htmlFor="phone">Telefone</label>
          <input id="phone" name="phone" type="tel" placeholder="81 9999-9999" />
        </div>
        {state?.errors?.phone && <p style={{ color: "red" }}>{state.errors.phone}</p>}
        <div>
          <input id="role-vendedor" name="role" type="radio" value="vendedor" required />
          <label htmlFor="role">Vendedor</label>
          <input id="role-cliente" name="role" type="radio" value="consumidor" required />
          <label htmlFor="role">Cliente</label>
          {state?.errors?.role && <p style={{ color: "red" }}>{state.errors.role}</p>}
        </div>
        <button disabled={pending} type="submit" >Cadastrar</button>
      </form>
      <div>
        <p>Já possui uma conta? <a href="/login">Faça o login</a> </p>
      </div>
    </section >
  );
}
