import * as z from "zod";

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "São necessários ao menos 2 caracteres" })
    .trim(),
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
  phone: z
    .string()
    .trim()
    .min(9, { error: "Telefone inválido" })
    .optional(),
  role: z.enum(["consumidor", "vendedor"], {
    error: "Selecione um tipo de conta"
  }),

})

export const RegisterAddressFormSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  isDefault: z.boolean(),
})
