import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateClientDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserResponse } from './dto/user.response.dto';
import { Paginate, Paginated} from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.', type: [User] })
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<UserResponse>>{
    return this.userService.findAll(query);
  }

  
  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações do cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado.', type: User })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiBody({ type: UpdateClientDto, description: 'Dados do cliente para atualização.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<UserResponse> {
    return this.userService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cliente (remoção lógica ou física, dependendo da regra de negócio)' })
  @ApiResponse({ status: 204, description: 'Cliente removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }


  //Desativar um usuário, implementar. 



}
