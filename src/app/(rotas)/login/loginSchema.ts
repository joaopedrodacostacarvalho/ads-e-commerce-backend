import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ error: "Por favor insira um email válido" }),
  password: z
    .string()
    .min(8, { error: 'Tenha ao menos 8 caracteres' })
    .regex(/[a-zA-Z]/, { error: 'Contenha ao menos uma letra' })
    .regex(/[0-9]/, { error: 'Contenha ao menos um número' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contenha ao menos um caractere especial',
    })
    .trim(),
})

export type FormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined
