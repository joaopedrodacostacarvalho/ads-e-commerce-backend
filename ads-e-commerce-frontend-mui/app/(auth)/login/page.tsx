"use client"

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <section>
      <form action={action}>
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
        <button disabled={pending} type="submit" >Fazer Login</button>
      </form>
      <div>
        <p>Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a> </p>
      </div>
    </section>
  );
}
