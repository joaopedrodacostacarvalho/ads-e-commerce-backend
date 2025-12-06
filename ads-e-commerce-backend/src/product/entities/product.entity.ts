import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/client/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @ApiProperty({ description: 'ID único do produto', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do produto', example: 'Notebook Gamer X' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Descrição detalhada do produto', example: 'Processador Intel Core i7...', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Preço unitário do produto', example: 4999.99, type: Number })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Estoque disponível', example: 15, type: Number })
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    onDelete: 'SET NULL', // Se apagar a categoria será setado como null
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ApiProperty({ description: 'ID da Categoria à qual o produto pertence', example: 2, type: Number })
  @Column({ type: 'int', nullable: true })
  categoryId: number;

  @ApiProperty({ description: 'Status de disponibilidade do produto', example: true, default: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'URL da imagem principal', example: 'https://exemplo.com/img/notebook.jpg' })
  @Column({ type: 'varchar' })
  imageUrl: string;

  
  @Column()
  sellerId: number; 

   
  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: 'sellerId' }) 
  seller: User; 

}
