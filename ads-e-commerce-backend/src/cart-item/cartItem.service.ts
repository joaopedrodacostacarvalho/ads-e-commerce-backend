import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Cart_item } from "./entity/cartItem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "src/product/entities/product.entity";
import { ProductService } from "src/product/product.service";
import { CartService } from "src/cart/cart.service";


@Injectable()
export class CartItemService{
   
  constructor(
    @InjectRepository(Cart_item)
    private cartItemRepo:Repository<Cart_item>,
    private readonly productService: ProductService,
    private readonly cartService: CartService 

  ){
  }

   //updateQuantity(cartItemId, quantity)
   //removeItem(cartItemId)
   //findItemsByCart(cartId)
   //clearCart(cartId)


async addItem(userId: number, productId: number, quantity: number) {

  // 1. Garantir que o usuário tem um carrinho
  const cart = await this.cartService.findUserCart(userId);

  // 2. Buscar produto e validar estoque
  const product = await this.productService.findOne(productId);

  if (!product) {
    throw new NotFoundException("Produto não encontrado");
  }

  if (product.stock < quantity) {
    throw new BadRequestException("Estoque insuficiente");
  }

  // 3. Buscar item existente no carrinho
  const existingItem = await this.cartItemRepo.findOne({
    where: { cartId: cart.id, productId },
  });

  // 4. Se já existe → atualiza quantidade
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (product.stock < newQuantity) {
      throw new BadRequestException("Quantidade maior que o estoque disponível");
    }

    existingItem.quantity = newQuantity;
    existingItem.subtotal = product.price * newQuantity;

    return await this.cartItemRepo.save(existingItem);
  }

  // 5. Se NÃO existe → cria item novo
  const newItem = this.cartItemRepo.create({
    cartId: cart.id,
    productId,
    quantity,
    unitPrice: product.price,
    subtotal: product.price * quantity,
  });

  return await this.cartItemRepo.save(newItem);
}

async updateQuantity(
  userId: number,
  cartItemId: number,
  quantity: number,
) {
  // 1. Busca o carrinho do usuario (garante que ele nao atualiza item de outro user)
  const cart = await this.cartService.getUserCart(userId);

  // 2. Busca o cartItem
  const cartItem = await this.cartItemRepo.findOne({
    where: { id: cartItemId, cart: { id: cart.id } },
    relations: ['product'],
  });

  if (!cartItem) {
    throw new NotFoundException('Item não encontrado no seu carrinho');
  }

  // Se quantidade = 0 → remover item
  if (quantity === 0) {
    await this.cartItemRepo.remove(cartItem);
    return { message: 'Item removido do carrinho' };
  }

  // 3. Verificar estoque
  if (cartItem.product.stock < quantity) {
    throw new BadRequestException('Estoque insuficiente');
  }

  // 4. Atualizar quantidade
  cartItem.quantity = quantity;
  cartItem.subtotal = quantity * cartItem.product.price;

  return await this.cartItemRepo.save(cartItem);
}

async removeItem(userId: number, cartItemId: number) {
  // 1. Buscar carrinho do usuário
  const cart = await this.cartService.getUserCart(userId);

  // 2. Buscar item pelo id e garantir que pertence ao carrinho do usuário
  const cartItem = await this.cartItemRepo.findOne({
    where: { id: cartItemId, cartId: cart.id },
  });

  if (!cartItem) {
    throw new NotFoundException(
      'Item não encontrado ou não pertence ao seu carrinho'
    );
  }

  // 3. Remover item
  await this.cartItemRepo.remove(cartItem);

  return { message: 'Item removido com sucesso' };
}



}