import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products
      .find(prod => prod.id === id);
    if (product === undefined) {
      throw new Error('Prodtuo não encontrado');
    }
    return product;
  }

  create(product: Product) {
    this.products.push(product);
  }

  update(id: number, updatedProduct: Product) {
    const productIdx = this.products
      .findIndex(prod => prod.id === id);
    if (productIdx > -1) {
      this.products[productIdx] = updatedProduct;
    }
  }

  remove(id: number) {
    this.products = this.products.filter(prod => prod.id !== id);
  }
}
