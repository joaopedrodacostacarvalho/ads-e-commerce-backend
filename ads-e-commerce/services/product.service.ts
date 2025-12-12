import api from "./api";
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductFilterParams,
} from "./types";

/**
 * Endpoint: GET /product/getall
 * Sumário: Buscar todos produtos com filtros opcionais.
 */
export async function findAllProducts(
  filters: ProductFilterParams = {}
): Promise<Product[]> {
  const response = await api.get<Product[]>("/product/getall", {
    params: filters,
  });
  return response.data;
}

/**
 * Endpoint: GET /product/myproducts
 * Sumário: Buscar produtos do usuário (vendedor) logado. (Requer JWT)
 */
export async function findMyProducts(
  filters: ProductFilterParams = {}
): Promise<Product[]> {
  const response = await api.get<Product[]>("/product/myproducts", {
    params: filters,
  });
  return response.data;
}

/**
 * Endpoint: GET /product/{id}
 * Sumário: Lista produto com id.
 */
export async function findOneProduct(id: number): Promise<Product> {
  const response = await api.get<Product>(`/product/${id}`);
  return response.data;
}

/**
 * Endpoint: POST /product/create
 * Sumário: Cria um novo produto. (Requer JWT)
 */
export async function createProduct(data: CreateProductDto): Promise<Product> {
  const response = await api.post<Product>("/product/create", data);
  return response.data;
}

/**
 * Endpoint: PATCH /product/{id}
 * Sumário: Atualiza parcialmente um produto. (Requer JWT)
 */
export async function updateProduct(
  id: number,
  data: UpdateProductDto
): Promise<Product> {
  const response = await api.patch<Product>(`/product/${id}`, data);
  return response.data;
}

/**
 * Endpoint: DELETE /product/inative/{id}
 * Sumário: Inativa um produto (isActive = false). (Requer JWT)
 */
export async function inativeProduct(id: number): Promise<Product> {
  const response = await api.delete<Product>(`/product/inative/${id}`);
  return response.data;
}

/**
 * Endpoint: DELETE /product/delete/{id}
 * Sumário: Deleta um produto (remoção física ou lógica). (Requer JWT)
 */
export async function deleteProduct(id: number): Promise<Product> {
  const response = await api.delete<Product>(`/product/delete/${id}`);
  return response.data;
}
