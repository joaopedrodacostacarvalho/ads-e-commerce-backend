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
import { Client } from 'src/client/entities/client.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  status: OrderStatus;

  // Subtotal (preço total dos itens sem descontos/frete)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  subtotal: number;

  // Quantidade total de itens no pedido
  @Column({ type: 'int', default: 0 })
  totalQuantity: number;

  // Total final (subtotal + frete - descontos)
  // Por simplicidade, usaremos igual ao subtotal por enquanto
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  total: number;

  // RELACIONAMENTOS: Cliente

  @Column({ type: 'int' })
  clientId: number; // Chave estrangeira

  @ManyToOne(() => Client, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  // RELACIONAMENTOS: Itens do Pedido

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: ['insert', 'update'], // Salva itens junto com o pedido
    eager: true, // Carrega os itens automaticamente
  })
  items: OrderItem[];

  // Data e hora de criação
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Data e hora da última atualização
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
