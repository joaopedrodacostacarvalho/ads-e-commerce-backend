import { Client } from "src/client/entities/client.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
@Index(['cleindId', 'isDefault'])
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  street: string

  @Column({ length: 10 })
  number: number

  @Column({ length: 100, nullable: true })
  complement: string

  @Column({ length: 100 })
  city: string

  @Column({ length: 100 })
  state: string

  @Column({ length: 10 })
  zipCode: string;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ type: 'int' })
  clientId: number;

  @ManyToOne(() => Client, (client) => client.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client
}
