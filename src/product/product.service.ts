import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  logger = new Logger(ProductService.name);

  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      ...createProductDto,
      isActive: true,
      id: this.products.length + 1,
    };
    this.products.push(newProduct);
    return `Sucesso na criação do produto #${newProduct.id}`;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    let product = this.products[id - 1];
    if (product === undefined) {
      throw new Error(`O produto não foi encontrado`!);
    }
    this.products[id - 1] = { ...product, ...updateProductDto };
    return `O produto #${id} foi atualizado`;
  }

  remove(id: number) {
    return `O produto #${id} foi removido`;
  }
}
