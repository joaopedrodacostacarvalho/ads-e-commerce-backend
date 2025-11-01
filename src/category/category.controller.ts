import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  findAll(): Category[] {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Category {
    return this.categoryService.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Category) {
    this.categoryService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedCategory: Category) {
    this.categoryService.update(Number(id), updatedCategory);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.categoryService.remove(Number(id));
  }
}
