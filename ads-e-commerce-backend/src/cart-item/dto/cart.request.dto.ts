import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class cartItemReq{

 @ApiProperty({ description: 'id do produto', example: 'id:2' })
 @IsNumber()
 productId: number;
 
 @ApiProperty({ description: 'quiantidade do produto', example: '3' })
 @IsNumber()
 quantity: number

}