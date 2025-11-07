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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.', type: Product })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiBody({ type: CreateProductDto, description: 'Dados completos para o novo produto.' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos com opções de filtro' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso.', type: [Product] })
  // Documenta os parâmetros de consulta (filtros)
  @ApiQuery({ name: 'name', required: false, description: 'Filtro por nome do produto (busca parcial).', type: String })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filtro por ID da categoria.', type: Number })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Filtro por preço mínimo.', type: Number })
  findAll(@Query() filterDto: ProductFilterDto): Promise<Product[]> {
    return this.productService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista produto com id' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.', type: Product })
  @ApiParam({ name: 'id', description: 'ID do produto', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado.', type: Product })
  @ApiResponse({ status: 404, description: 'Produto ou Categoria não encontrado.' })
  @ApiBody({ type: UpdateProductDto, description: 'Dados a serem atualizados (parciais).' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser atualizado', type: Number })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove (inativa) um produto' })
  @ApiResponse({ status: 200, description: 'Produto removido (isActive = false).', type: Product }) // A Entity retorna o produto com isActive=false
  @ApiResponse({ status: 404, description: 'Produto ou Categoria não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser removido', type: Number })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
