import api from "./api";
import { Category, CreateCategoryDto, UpdateCategoryDto } from "./types";

/**
 * Endpoint: GET /category
 * Sumário: Lista todas as categorias.
 */
export async function findAllCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/category");
  return response.data;
}

/**
 * Endpoint: GET /category/{id}
 * Sumário: Busca uma categoria por ID.
 */
export async function findOneCategory(id: number): Promise<Category> {
  const response = await api.get<Category>(`/category/${id}`);
  return response.data;
}

/**
 * Endpoint: POST /category
 * Sumário: Cria uma nova categoria.
 */
export async function createCategory(
  data: CreateCategoryDto
): Promise<Category> {
  const response = await api.post<Category>("/category", data);
  return response.data;
}

/**
 * Endpoint: PATCH /category/{id}
 * Sumário: Atualiza uma categoria.
 */
export async function updateCategory(
  id: number,
  data: UpdateCategoryDto
): Promise<Category> {
  const response = await api.patch<Category>(`/category/${id}`, data);
  return response.data;
}

/**
 * Endpoint: DELETE /category/{id}
 * Sumário: Remove uma categoria.
 */
export async function removeCategory(id: number): Promise<void> {
  await api.delete(`/category/${id}`);
}
