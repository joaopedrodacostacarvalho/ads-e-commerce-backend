import { ApiProperty } from '@nestjs/swagger';
import { Cart_item } from 'src/cart-item/entity/cartItem.entity';
// import { CartItem } from 'src/cart-item/entity/cartItem.entity';
import { User } from 'src/client/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @ApiProperty({ description: 'ID do carrinho', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Data e hora do cadastro do cliente', example: '2025-07-11T19:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp' })
  registrationDate: Date;

  @Column()
  userId: number;

  // Relacionamento One-to-One
  @OneToOne(() => User, (user) => user.cart) // 1. Referencia a entidade User
  @JoinColumn({ name: 'userId' }) // 2. Indica qual coluna é a chave estrangeira (FK)
  user: User; // 3. Propriedade para acessar o objeto User

  // 🛒 Relacionamento One-to-Many com CartItem
  // @OneToMany(() => Cart_item, (cart_item) => cart_item.cart) // 1. Mapeia para a propriedade 'cart' em CartItem
  // items: Cart_item[];// 2. Propriedade para armazenar a lista de itens

  @OneToMany(() => Cart_item, (cart_item) => cart_item.cart, {
  cascade: false,
  eager: false,
  })
  items: Cart_item[];

}
