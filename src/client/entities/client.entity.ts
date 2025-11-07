import { Exclude } from 'class-transformer';
import { Address } from 'src/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Exclude() // Armazenada com hash. Exclude para omiter em respostar HTTP
  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  registrationDate: Date;

  @OneToMany(() => Address, (address) => address.client, {
    cascade: true,
  })
  addresses: Address[];
}
