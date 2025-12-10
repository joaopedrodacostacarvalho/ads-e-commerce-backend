import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from 'src/client/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty({ description: 'ID único do pedido', example: 101 }) // NOVO
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Status atual do pedido',
    enum: OrderStatus, // NOVO: Usa o Enum
    example: OrderStatus.OPEN
  })
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  status: OrderStatus;

  @ApiProperty({ description: 'Subtotal (soma dos preços dos itens)', example: 150.99, type: Number })
  // Subtotal (preço total dos itens sem descontos/frete)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  subtotal: number;

  @ApiProperty({ description: 'Quantidade total de produtos diferentes no pedido', example: 3, type: Number })
  // Quantidade total de itens no pedido
  @Column({ type: 'int', default: 0 })
  totalQuantity: number;

  @ApiProperty({ description: 'Total final do pedido (subtotal + frete - descontos)', example: 150.99, type: Number })
  // Total final (subtotal + frete - descontos)
  // Por simplicidade, usaremos igual ao subtotal por enquanto
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  total: number;

  // RELACIONAMENTOS: Cliente

  // @ApiProperty({ description: 'ID do Cliente proprietário deste pedido', example: 5, type: Number })
  // @Column({ type: 'int' })
  // clientId: number; // Chave estrangeira

  @Column({ type: 'int' })
  userId: number; // Chave estrangeira

  @ApiProperty({ description: 'Objeto Cliente (relação)', type: () => User })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  client: User;

  // RELACIONAMENTOS: Itens do Pedido

  @ApiProperty({ description: 'Lista de itens do pedido (relação)', type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: ['insert', 'update'], // Salva itens junto com o pedido
    eager: true, // Carrega os itens automaticamente
  })
  items: OrderItem[];

  @ApiProperty({ description: 'Data de criação do pedido', example: '2025-11-07T09:00:00.000Z' })
  // Data e hora de criação
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do pedido', example: '2025-11-07T09:05:00.000Z' })
  // Data e hora da última atualização
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
