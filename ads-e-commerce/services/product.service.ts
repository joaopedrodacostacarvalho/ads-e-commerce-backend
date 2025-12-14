import api from "./api";
import { Product, CreateProductDto, UpdateProductDto } from "./types";

// Endereço base da controller de Produto
const PRODUCT_BASE_URL = "/product";

/**
 * Busca todos os produtos ativos.
 * @returns Lista de objetos Product.
 */
export async function findAllProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>(PRODUCT_BASE_URL);
  return data;
}

/**
 * Busca um produto específico pelo ID.
 */
export async function findProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`${PRODUCT_BASE_URL}/${id}`);
  return data;
}

/**
 * Cria um novo produto (função de vendedor/admin).
 */
export async function createProduct(
  productData: CreateProductDto
): Promise<Product> {
  const { data } = await api.post<Product>(PRODUCT_BASE_URL, productData);
  return data;
}

/**
 * Atualiza um produto existente.
 */
export async function updateProduct(
  id: number,
  productData: UpdateProductDto
): Promise<Product> {
  const { data } = await api.patch<Product>(
    `${PRODUCT_BASE_URL}/${id}`,
    productData
  );
  return data;
}

/**
 * Remove um produto.
 */
export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`${PRODUCT_BASE_URL}/${id}`);
}
