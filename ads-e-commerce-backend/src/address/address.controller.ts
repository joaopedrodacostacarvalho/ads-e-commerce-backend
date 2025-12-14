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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; 

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo endereço para um cliente' }) 
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso.', type: Address }) 
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiBody({ type: CreateAddressDto }) 
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Busca todos os endereços de um cliente específico' }) 
  @ApiResponse({ status: 200, description: 'Lista de endereços do cliente.', type: [Address] }) 
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'clientId', description: 'ID do cliente proprietário', type: Number }) 
  findAll(
    @Param('clientId', ParseIntPipe) clientId: number,
  ): Promise<Address[]> {
    return this.addressService.findAllByClient(clientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um endereço por ID' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado.', type: Address }) 
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do endereço', type: Number }) 
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações de um endereço' }) 
  @ApiResponse({ status: 200, description: 'Endereço atualizado.', type: Address }) 
  @ApiResponse({ status: 404, description: 'Endereço ou Cliente não encontrado.' })
  @ApiBody({ type: UpdateAddressDto, description: 'Dados do endereço para atualização.' })
  @ApiParam({ name: 'id', description: 'ID do endereço', type: Number })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um endereço' }) 
  @ApiResponse({ status: 204, description: 'Endereço removido com sucesso.' }) 
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do endereço', type: Number })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.addressService.remove(id);
  }
}
