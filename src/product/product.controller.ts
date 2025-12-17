import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetSellerId } from 'src/auth/role/get.seller.decorator';
import { ProductResponse } from './dto/product.response';
import { ProductRequest } from './dto/product.request';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Paginate } from 'nestjs-paginate';
import type { Paginated, PaginateQuery } from 'nestjs-paginate';


@ApiTags('Produtos')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('vendedor')
  @Post("/create")
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.', type: Product })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiBody({ type: CreateProductDto, description: 'Dados completos para o novo produto.' })
 async create(
    @Body() productRequest: ProductRequest,
    @GetSellerId() sellerId: number   //CRIEI PARA PEGARMOS ID DO TOKEN

  ): Promise<ProductResponse> {
    return this.productService.create(productRequest, sellerId);
  }


  @Get("/getall")
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiOperation({ summary: 'Buscar todos produtos' })
  async findAll(
    @Paginate() query: PaginateQuery,
    @Query() filters: ProductFilterDto,
  ): Promise<Paginated<Product>> {
    return this.productService.findAll(query, filters);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('vendedor')
  @Get("/myproducts")
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiOperation({ summary: 'Buscar meus produtos' })
  async findMyProducts(
    @Paginate() query: PaginateQuery,
    @Query() filters: ProductFilterDto,
    @GetSellerId() sellerId: number
  ): Promise<Paginated<Product>> {
    return this.productService.findMyProducts(query, filters, sellerId);
  }
  
  
  @Get(':id')
  @ApiOperation({ summary: 'Lista produto com id' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.', type: Product })
  @ApiParam({ name: 'id', description: 'ID do produto', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  

  @Patch(':id')
  @Roles('vendedor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualiza parcialmente um produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado.', type: Product })
  @ApiResponse({ status: 404, description: 'Produto ou Categoria não encontrado.' })
  @ApiBody({ type: UpdateProductDto, description: 'Dados a serem atualizados (parciais).' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser atualizado', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }


  
  @Delete('inative/:id')
  @Roles('vendedor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Inativa um produto' })
  @ApiResponse({ status: 200, description: 'Produto removido (isActive = false).', type: Product }) // A Entity retorna o produto com isActive=false
  @ApiResponse({ status: 404, description: 'Produto ou Categoria não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser removido', type: Number })
  async inative(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.inative(id);
  }


  @Delete('delete/:id')
  @Roles('vendedor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deleta um produto' })
  @ApiResponse({ status: 200, description: 'Produto removido (isActive = false).', type: Product }) // A Entity retorna o produto com isActive=false
  @ApiResponse({ status: 404, description: 'Produto ou Categoria não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser removido', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.remove(id);
  }


}
