// src/services/types.ts

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  reservedStock: number;
  categoryId: number;
  isActive: boolean;
  imageUrl: string;
}

export interface PaginatedResponse<T> {
  data: T[]; 
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface Category {
  id: number;
  name: string;
  products?: Product[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  registrationDate: string;
  role?: "consumidor" | "vendedor"; 
}

export interface JWTPayload {
  email: string;
  role: string;
  exp: number; // UNIX timestamp em segundos
  iat: number; // Emitido em
}

export interface Address {
  id: number;
  street: string;
  number: number;
  complement: string | null;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  clientId: number;
}

// --- DTOs (Data Transfer Objects) ---

// Produto
export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  isActive?: boolean;
}

export interface ProductFilterParams {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}

// Categoria
export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name?: string;
}

// Auth & User
export interface LoginReq {
  email: string;
  password: string;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "consumidor" | "vendedor";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UpdateClientDto {
  password?: string;
}

// Endereço
export interface CreateAddressDto {
  street: string;
  number: number;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
  clientId: number;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {}

// Pedido (Order)
export type OrderStatus =
  | "ABERTO"
  | "AGUARDANDO_PAGAMENTO"
  | "PAGO"
  | "CANCELADO";

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number; // Histórico do preço no momento da compra
  productName?: string; // Útil para display
}

export interface Order {
  id: number;
  status: OrderStatus;
  subtotal: number;
  totalQuantity: number;
  total: number;
  client: User;
  items: OrderItem[]; 
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  userId: number;
}

export interface UpdateOrderDto {
  status: OrderStatus;
}

// Carrinho
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product; 
  subtotal: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  totalItems: number;
}

export interface AddToCartDto {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDto {
  cartItemId: number;
  quantity: number;
}
