import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { ProductFilterDto } from './dto/product-filter.dto';
import { min } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.categoryService.findOne(createProductDto.categoryId);

    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async findAll(filterDto: ProductFilterDto): Promise<Product[]> {
    const { name, categoryId, minPrice, maxPrice } = filterDto;

    const where: any = {};

    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (minPrice && maxPrice) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice) {
      where.price = Between(minPrice, Number.MAX_SAFE_INTEGER);
    } else if (maxPrice) {
      where.price = Between(0, maxPrice);
    }

    return this.productRepository.find({ where, order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`O produto com #${id} não foi encontrado`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.categoryId) {
      await this.categoryService.findOne(updateProductDto.categoryId);
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    product.isActive = false;

    await this.productRepository.save(product);
  }
}
