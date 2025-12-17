import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/client/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('address')
@Index(['clientId', 'isDefault'])
export class Address {
  @ApiProperty({ description: 'ID único do endereço', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome da rua/avenida', example: 'Rua Principal' })
  @Column()
  street: string;

  @ApiProperty({ description: 'Número do imóvel', example: '123 A' })
  @Column()
  number: number;

  @ApiProperty({ description: 'Complemento (apto, bloco, etc.)', example: 'Apto 401', nullable: true })
  @Column({ nullable: true })
  complement: string;

  @ApiProperty({ description: 'Cidade', example: 'São Paulo' })
  @Column()
  city: string;

  @ApiProperty({ description: 'Estado', example: 'SP' })
  @Column()
  state: string;

  @ApiProperty({ description: 'CEP', example: '01000-000' })
  @Column()
  zipCode: string;

  @ApiProperty({ description: 'Indica se é o endereço principal do cliente', default: false })
  @Column({ default: false })
  isDefault: boolean;

  @ApiProperty({ description: 'ID do Cliente proprietário', example: 5, type: Number })
  @Column({ type: 'int', unique: true })
  clientId: number;

  @ApiProperty({ description: 'Objeto Cliente (relação)', type: () => User })
    // 💡 MUDANÇA: Relacionamento One-to-One
    @OneToOne(() => User, (user) => user.address, { 
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'clientId' }) // 💡 Mantém o JoinColumn para definir clientId como a FK
    user: User;
}
