import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class CreateOrderDt { 
  @ApiProperty({ description: 'id do usuario', example: 'userId' })
  @IsNumber()
  userId: number;
}