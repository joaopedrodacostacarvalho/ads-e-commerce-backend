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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; 
import { OrderStatus } from './enums/order-status.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo pedido (Status: ABERTO)' }) 
  @ApiResponse({ 
    status: 201, 
    description: 'Pedido criado com sucesso (status ABERTO).', 
    type: Order 
  }) 
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiBody({ type: CreateOrderDto }) 
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get('/order/:id')
  @ApiOperation({ summary: 'Busca todos os pedidos de um cliente' }) 
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pedidos do cliente.', 
    type: [Order] 
  }) 
  @ApiParam({ 
    name: 'id', 
    description: 'ID do Cliente', 
    type: Number 
  }) 
  findAll(@Param('id', ParseIntPipe) id: number): Promise<Order[]> {
    return this.orderService.findAll(id);
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
