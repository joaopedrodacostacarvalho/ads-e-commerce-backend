import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger'; 
import { OrderStatus } from './enums/order-status.enum';
import { Roles } from 'src/auth/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role/role.guard';
import { CreateOrderDt } from './dto/order.test.dto';
import { Product } from 'src/product/entities/product.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  //NÃO USAREMOS ESSE, MAS 
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')  //OK
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('consumidor')
  // @Post()
  // @ApiOperation({ summary: 'Antigo Criar um pedido (order)' })
  // async createOrder(
  //   @Body() Product:CreateOrderDt
  // ) {
  //   return this.orderService.createOrder(Product.userId);
  // }

  //ESSE MÉTODO SERVE PARA CRIAR UM PEDIDO. AO CRIAR, ELE LIMPA O CARRINHO 
  //E O ORDEM PASSA A TER O STATUS:WAITING_PAYMENT = `AGUARDANDO_PAGAMENTO`
  //BASTA PASSAR O ID DO CLIENTE, QUE SERÁ CRIADO COM BASE NOS PRODUTOS DO CARRINHO
  //DO USUARIO LOGADO
  //(MYCARTS)

  //USE O JOSE PARA EXTRAIR ID DO TOKEN E MANDE A REQUISIÇÃO PASSANDO O ID NO BODY
  //POR ALGUM MOTIVO MACABRO SÓ FUNCIONA ASSIM. 
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')  //OK
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('consumidor')
  @Post('/create')
  @ApiOperation({ summary: 'Novo Criar um pedido (order)' })
  async publicar(
    @Body() Produto:CreateOrderDt
  ) {
    return this.orderService.create(Produto.userId);
  }





  @Get(':id')
  @ApiOperation({ summary: 'Busca um pedido por ID' }) 
  @ApiResponse({ 
    status: 200, 
    description: 'Pedido encontrado.', 
    type: Order 
  }) 
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do Pedido', 
    type: Number 
  }) 
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualiza o status de um pedido' }) 
  @ApiResponse({ 
    status: 200, 
    description: 'Status do pedido atualizado.', 
    type: Order 
  }) 
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @ApiResponse({ 
    status: 400, 
    description: `Status inválido. Status permitidos: ${Object.values(OrderStatus).filter(s => s !== OrderStatus.OPEN).join(', ')}` 
  })
  @ApiParam({ name: 'id', description: 'ID do Pedido', type: Number })
  @ApiBody({ type: UpdateOrderDto, description: 'Novo status do pedido' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove (cancela) um pedido' }) // A remoção lógica é tipicamente um cancelamento.
  @ApiResponse({ status: 204, description: 'Pedido removido/cancelado com sucesso.' }) 
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do Pedido', type: Number })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderService.remove(id);
  }
}
function GetUserId(): (target: OrderController, propertyKey: "createOrder", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

