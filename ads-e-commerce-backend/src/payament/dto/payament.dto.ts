import { IsNumber } from "class-validator";

export class PayOrderDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  amount: number; // valor enviado pelo front
}
