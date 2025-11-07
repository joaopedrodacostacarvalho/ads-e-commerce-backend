import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @ApiProperty({ description: 'ID da Categoria', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome da Categoria', example: 'Eletrônicos' })
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty({ type: () => [Product], description: 'Lista de produtos vinculados a esta categoria' })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ApiProperty({ description: 'Status de disponibilidade (ativo/inativo)', default: true })
  @Column({ default: true })
  isActive: boolean;
}
