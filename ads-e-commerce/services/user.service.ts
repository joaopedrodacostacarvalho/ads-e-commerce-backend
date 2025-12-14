import api from "./api";
import { User, UpdateClientDto } from "./types";

/**
 * Endpoint: GET /user
 * Sumário: Lista todos os clientes. (Requer JWT)
 */
export async function findAllUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/user");
  return response.data;
}

/**
 * Endpoint: GET /user/{id}
 * Sumário: Busca um cliente por ID.
 */
export async function findOneUser(id: number): Promise<User> {
  const response = await api.get<User>(`/user/${id}`);
  return response.data;
}

/**
 * Endpoint: PATCH /user/{id}
 * Sumário: Atualiza informações do cliente.
 */
export async function updateUser(
  id: number,
  data: UpdateClientDto
): Promise<User> {
  const response = await api.patch<User>(`/user/${id}`, data);
  return response.data;
}

/**
 * Endpoint: DELETE /user/{id}
 * Sumário: Remove um cliente.
 */
export async function removeUser(id: number): Promise<void> {
  await api.delete(`/user/${id}`);
}
