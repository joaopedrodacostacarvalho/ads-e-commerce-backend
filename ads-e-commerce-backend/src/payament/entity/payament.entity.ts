import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payament')
export class Payament {
  @ApiProperty({ description: 'ID do carrinho', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amout:number; 



  @ApiProperty({ description: 'Data e hora do cadastro do cliente', example: '2025-07-11T19:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp' })
  registrationDate: Date;


}
