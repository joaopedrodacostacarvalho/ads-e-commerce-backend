import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Clientes') 
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente (cadastro)' }) 
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.', type: Client })
  @ApiResponse({ status: 400, description: 'E-mail já cadastrado ou dados inválidos.' })
  @ApiBody({ type: CreateClientDto })
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.', type: [Client] })
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente por ID' }) 
  @ApiResponse({ status: 200, description: 'Cliente encontrado.', type: Client }) 
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number }) 
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações do cliente' }) 
  @ApiResponse({ status: 200, description: 'Cliente atualizado.', type: Client }) 
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiBody({ type: UpdateClientDto, description: 'Dados do cliente para atualização.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cliente (remoção lógica ou física, dependendo da regra de negócio)' }) 
  @ApiResponse({ status: 204, description: 'Cliente removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clientService.remove(id);
  }
}
