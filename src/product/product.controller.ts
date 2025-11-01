import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productServie: ProductService) { }

  @Get()
  findAll(): Product[] {
    return this.productServie.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productServie.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Product) {
    this.productServie.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedProduct: Product) {
    this.productServie.update(Number(id), updatedProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productServie.remove(Number(id));
  }
}
