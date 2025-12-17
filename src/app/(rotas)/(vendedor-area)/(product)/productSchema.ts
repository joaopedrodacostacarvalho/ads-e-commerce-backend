import * as z from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").trim(),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive("Preço deve ser positivo"),
  stock: z.coerce.number().int().min(0, "Estoque não pode ser negativo"),
  categoryId: z.coerce.number().positive("Selecione uma categoria válida"),
  imageUrl: z.url("Insira uma URL de imagem válida"),
});

export type ProductFormData = z.infer<typeof ProductFormSchema>;
