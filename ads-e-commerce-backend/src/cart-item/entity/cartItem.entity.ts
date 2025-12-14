import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart_item')
export class Cart_item {
  @ApiProperty({ description: 'ID do cart-item', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Quantidade do item', example: 1 })
  @Column()
  quantity: number;

  @ApiProperty({ description: 'Preco unitario', example: 1 })
  @Column()
  unitPrice:number;

  @ApiProperty({ description: 'SubTotal: unitario x quantity', example: 1 })
  @Column()
  subtotal:number;

  @Column()
  productId:number;

  @ManyToOne(() => Product, product => product.cartItems)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  cartId: number;

  
  // @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' }) // Mapeia para a propriedade 'items' em Cart
  // @JoinColumn({ name: 'cartId' }) // Especifica que 'cartId' é a chave estrangeira
  // cart: Cart;

  @ManyToOne(() => Cart, cart => cart.items, { 
  onDelete: 'CASCADE',
  nullable: false,
  })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

}
