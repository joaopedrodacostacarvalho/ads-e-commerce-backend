import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Product) {
    this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedProduct: Product) {
    this.productService.update(Number(id), updatedProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productService.remove(Number(id));
  }
}
