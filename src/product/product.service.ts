import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    findAll(): Product[] {
        return this.products;
    }

    findOne(name: string): Product {
        const product = this.products
            .find(prod => prod.name === name);
        if (product === undefined) {
            throw new Error('Prodtuo não encontrado');
        }
        return product;
    }

    create(product: Product) {
        this.products.push(product);
    }

    update(name: string, updatedProduct: Product) {
        const productIdx = this.products
            .findIndex(prod => prod.name === name);
        if (productIdx > -1) {
            this.products[productIdx] = updatedProduct;
        }
    }

    remove(name: string) {
        this.products = this.products.filter(prod => prod.name !== name);
    }
}
