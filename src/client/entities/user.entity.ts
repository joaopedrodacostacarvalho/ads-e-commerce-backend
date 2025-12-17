import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Address } from 'src/address/entities/address.entity';
import { UserRole } from 'src/auth/role/user.role';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
 
@Entity('user')
export class User {
  @ApiProperty({ description: 'ID único do usuário', example: 5 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome completo do usuario', example: 'Maria de Fátima' })
  @Column()
  name: string;

  @ApiProperty({ description: 'E-mail (único para login)', example: 'maria.fatima@exemplo.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Telefone de contato', example: '5511987654321', nullable: true })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ description: 'Senha (HASHED no banco de dados)', writeOnly: true })
  @Exclude() // Armazenada com hash. Exclude para omiter em respostar HTTP
  @Column()
  password: string;

  @ApiProperty({ description: 'Data e hora do cadastro do cliente', example: '2025-07-11T19:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp' })
  registrationDate: Date;


  @Column({
  type: 'enum',
  enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({ description: 'Relação com CARRINHO', type: () => Address })
  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: true, // Opcional: deleta/salva o carrinho junto com o usuário
  })
  cart: Cart;

  @ApiProperty({ description: 'Relação com Endereços', type: () => Address })
    // MUDANÇA: Relacionamento One-to-One
  @OneToOne(() => Address, (address) => address.user, {
      cascade: true, // Garante que o endereço é salvo/deletado junto com o usuário
  })
  address: Address;


  @OneToMany(() => Product, product => product.seller)
    products: Product[]; // Este campo armazena a lista de produtos deste vendedor (opcional)
}
