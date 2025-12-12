import api from "./api";
import { Address, CreateAddressDto, UpdateAddressDto } from "./types";

/**
 * Endpoint: POST /address
 * Sumário: Cria um novo endereço para um cliente.
 */
export async function createAddress(data: CreateAddressDto): Promise<Address> {
  const response = await api.post<Address>("/address", data);
  return response.data;
}

/**
 * Endpoint: GET /address/client/{clientId}
 * Sumário: Busca todos os endereços de um cliente específico.
 */
export async function findAllAddressesByClient(
  clientId: number
): Promise<Address[]> {
  const response = await api.get<Address[]>(`/address/client/${clientId}`);
  return response.data;
}

/**
 * Endpoint: GET /address/{id}
 * Sumário: Busca um endereço por ID.
 */
export async function findOneAddress(id: number): Promise<Address> {
  const response = await api.get<Address>(`/address/${id}`);
  return response.data;
}

/**
 * Endpoint: PATCH /address/{id}
 * Sumário: Atualiza informações de um endereço.
 */
export async function updateAddress(
  id: number,
  data: UpdateAddressDto
): Promise<Address> {
  const response = await api.patch<Address>(`/address/${id}`, data);
  return response.data;
}

/**
 * Endpoint: DELETE /address/{id}
 * Sumário: Remove um endereço.
 */
export async function removeAddress(id: number): Promise<void> {
  await api.delete(`/address/${id}`);
}
