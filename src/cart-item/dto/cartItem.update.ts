import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class CartItemUpdate{
   
  @ApiProperty({ description: 'CartItem id: ', example: '1' })
  @IsNumber()
  cartItemId: number; 
  
  @ApiProperty({ description: 'id do produto', example: '2' })
  @IsNumber() 
  quantity: number 
}