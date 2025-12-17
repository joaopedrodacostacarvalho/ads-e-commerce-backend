import * as z from "zod";

export const RegisterUserFormSchema = z.object({
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
  street: z.string().trim().min(1, "Rua obrigatória"),
  number: z.string().trim().min(1, "Número obrigatório"),
  complement: z.string().trim().optional(),
  city: z.string().trim().min(1, "Cidade obrigatória"),
  state: z.string().trim().min(2, "Estado obrigatório"),
  zipCode: z.string().trim().min(8, "CEP inválido"),
});

export const RegisterFormSchema = z.object({
  user: RegisterUserFormSchema,
  address: RegisterAddressFormSchema,
});
