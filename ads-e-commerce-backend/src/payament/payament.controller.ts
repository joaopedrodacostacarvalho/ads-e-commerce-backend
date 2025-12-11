import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { PayOrderDto } from "./dto/payament.dto";
import { PayamentService } from "./payament.service";

@Controller('payament')
export class PayamentController{

constructor(private readonly orderService: PayamentService) { }

@Post('pay')
@ApiOperation({ summary: 'Simular pagamento de um pedido' })
payOrder(@Body() dto: PayOrderDto) {
  return this.orderService.payOrder(dto);
}



}