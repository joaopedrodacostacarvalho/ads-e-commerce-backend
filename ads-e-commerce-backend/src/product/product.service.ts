import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UserService } from 'src/client/user.service';
import { ProductRequest } from './dto/product.request';
import { ProductResponse } from './dto/product.response';
import { plainToInstance } from 'class-transformer';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
    private userService: UserService  
  ) {}

  //sellerId: Id do usuario logado, extraimos do token.
  async create(productRequestDto: ProductRequest, sellerId: number): Promise<ProductResponse> {
  
    const category = await this.categoryService.findOne(productRequestDto.categoryId)
    const userVendedor = await this.userService.findOne(sellerId)

    const newProduct = this.productRepository.create(productRequestDto);
    newProduct.sellerId = userVendedor.id;
    await this.productRepository.save(newProduct);

    //Serve para fazer um mapper da entidade para dto de saída
    const entityResponseDto = plainToInstance(ProductResponse, newProduct, {
            excludeExtraneousValues: true, // só retorna @Expose()
    });

    entityResponseDto.category = category.name;
    entityResponseDto.seller = userVendedor.name;


    return entityResponseDto
  }

  //adicionar metodo para trazer todos os produtos do usuario logado (filtro ativo e inativo)

  async findAll(
  query: PaginateQuery,
  filters: ProductFilterDto,
): Promise<Paginated<Product>> {
  
  const where: any = {
    isActive: true, //Sempre oculta produtos inativos
  };

  //Filtro por nome
  if (filters.name) {
    where.name = Like(`%${filters.name}%`);
  }

  //Filtro por categoria
  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }

  // Filtro por faixa de preço
  if (filters.minPrice || filters.maxPrice) {
    where.price = Between(
      filters.minPrice ?? 0,
      filters.maxPrice ?? Number.MAX_SAFE_INTEGER,
    );
  }

  return paginate(query, this.productRepository, {
    sortableColumns: ['name', 'price', 'id'],
    defaultSortBy: [['name', 'ASC']],
    where,
    maxLimit: 100,
  });
}

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`O produto com #${id} não foi encontrado`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.categoryId) {
      await this.categoryService.findOne(updateProductDto.categoryId);
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async inative(id: number): Promise<void> {
    const product = await this.findOne(id);

    product.isActive = false;

    await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.delete(product);
  }


  //VERIFICAR DEBITAR E CREDITAR  
  async debitStock(productId: number, quantity: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto com ID ${productId} não encontrado para débito de estoque`,
      );
    }

    if (product.stock < quantity) {
      throw new Error(
        `Estoque insuficiente para o produto ${product.name}. Disponível: ${product.stock}, Solicitado: ${quantity}`,
      );
    }

    product.stock -= quantity;
    await this.productRepository.save(product);
  }

  async creditStock(productId: number, quantity: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      // Loga, mas não lança erro fatal (pode ser um produto antigo/deletado)
      console.warn(
        `Produto com ID ${productId} não encontrado para crédito de estoque`,
      );
      return;
    }

    product.stock += quantity;
    await this.productRepository.save(product);
  }
}
