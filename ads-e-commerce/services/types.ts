// Produto
export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  reservedStock: number;
  categoryId: number;
  isActive: boolean;
  imageUrl: string;
};

export type CreateProductDto = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl: string;
};

export type UpdateProductDto = Partial<CreateProductDto> & {
  isActive?: boolean;
};

export type ProductFilterParams = {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
};

// Categoria
export type Category = {
  id: number;
  name: string;
  products: Product[]; // Simplificado
};

export type CreateCategoryDto = {
  name: string;
};

export type UpdateCategoryDto = {
  name?: string; // Simplificado, pois o schema UpdateCategoryDto está vazio
};

// Usuário / Auth
export type User = {
  role: string;
  id: number;
  name: string;
  email: string;
  phone: string | null;
  registrationDate: string;
  // password não incluído, pois é writeOnly
  // cart, address - relações que podem ser complexas
};

export type LoginReq = {
  email: string;
  password: string;
};

export type UserRequest = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "consumidor" | "vendedor";
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type UpdateClientDto = {
  password?: string;
};

// Endereço
export type Address = {
  id: number;
  street: string;
  number: number;
  complement: string | null;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  clientId: number;
  user?: User; // Relação
};

export type CreateAddressDto = {
  street: string;
  number: number;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
  clientId: number;
};

export type UpdateAddressDto = Partial<CreateAddressDto>; // Simplificado

// Pedido (Order)
export type OrderStatus =
  | "ABERTO"
  | "AGUARDANDO_PAGAMENTO"
  | "PAGO"
  | "CANCELADO";

export type OrderItem = {
  // Conteúdo Omitido no Swagger, mas é uma relação
};

export type Order = {
  id: number;
  status: OrderStatus;
  subtotal: number;
  totalQuantity: number;
  total: number;
  client: User;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderDt = {
  userId: number;
};

export type UpdateOrderDto = {
  status: OrderStatus;
};

export type CreateOrderItemDto = {
  productId: number;
  quantity: number;
  orderId: number;
};

// Carrinho (Cart & CartItem)
export type Cart = {
    data: unknown;
  // Conteúdo Omitido no Swagger, mas é uma relação do User
};

export type CartItemReq = {
  productId: number;
  quantity: number;
};

export type CartItemUpdate = {
  cartItemId: number;
  quantity: number;
};

export type PayOrderDto = {
  orderId: number; // Supondo, já que o schema está vazio
};
