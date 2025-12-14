import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./entity/cart.entity";
import { Repository } from "typeorm";
import { Cart_item } from "src/cart-item/entity/cartItem.entity";

@Injectable()
export class CartService{

  constructor(
    @InjectRepository(Cart)
    private cartRepo:Repository<Cart>,

    @InjectRepository(Cart_item)
    private cartItemRepo:Repository<Cart_item>

  ){}


//   async getUserCart(userId: number): Promise<Cart> {
//   let cart = await this.cartRepo.findOne({
//     where: { userId },
//     relations: ['items', 'items.product'], // traz produto junto
//   });

//   // Se existe, retorna
//   if (cart) return cart;

//   // Se não existe, cria
//   const newCart = this.cartRepo.create({ userId });
//   return await this.cartRepo.save(newCart);
// }

async clearCart(userId: number) {
  const cart = await this.cartRepo.findOne({
    where: { userId },
  });

  if (!cart) {
    throw new NotFoundException('Carrinho não encontrado');
  }

  await this.cartItemRepo.delete({ cartId: cart.id });

  return { message: 'Carrinho limpo com sucesso!' };
}

//   async clearCart(userId: number) {
//   // 1. Busca o carrinho completo (com itens)
//   const cart = await this.cartRepo.findOne({
//     where: { userId },
//     relations: ['items'],
//   });

//   if (!cart) {
//     throw new NotFoundException('Carrinho não encontrado');
//   }

//   // 2. Remove todos os itens
//   if (cart.items.length > 0) {
//     await this.cartItemRepo.remove(cart.items); //indica erro: 
//   }

//   // 3. Garantir que o cart.items fica vazio
//   cart.items = [];

//   // 4. Salva sem itens
//   await this.cartRepo.save(cart);

//   return { message: 'Carrinho limpo com sucesso!' };
// }
  



  async getUserCart(userId: number) {
  let cart = await this.cartRepo.findOne({
    where: { userId },
    relations: ['items', 'items.product'], // <- ESSENCIAL
  });

  if (!cart) {
    cart = await this.cartRepo.save({ userId });
    // garantir que retorne com arrays vazios
    return { id: cart.id, items: [] };
  }

  return {
    id_cart: cart.id,
    items: cart.items.map(i => ({
      id: i.id,
      productId: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      subtotal: i.product.price * i.quantity
    }))
  };
}



  async findUserCart(userId: number): Promise<Cart> {
  let cart = await this.cartRepo.findOne({
    where: { userId: userId },
    relations: ['items'], // opcional, caso queira trazer os itens
  });

  if (cart) {
    return cart;
  }

  const newCart = this.cartRepo.create({ userId });
  return await this.cartRepo.save(newCart);
}


}