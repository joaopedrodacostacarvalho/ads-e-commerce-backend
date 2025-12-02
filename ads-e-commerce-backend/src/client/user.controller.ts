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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateClientDto } from './dto/create-user.dto';
import { UpdateClientDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente (cadastro)' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.', type: User })
  @ApiResponse({ status: 400, description: 'E-mail já cadastrado ou dados inválidos.' })
  @ApiBody({ type: CreateClientDto })
  async create(@Body() createClientDto: CreateClientDto): Promise<User> {
    return this.userService.create(createClientDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('vendedor')
  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
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
  ): Promise<User> {
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
}
