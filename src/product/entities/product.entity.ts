import { Category } from 'src/category/entities/category.entity';

export class Product {
  id: number;

  name: string;

  price: number;

  categories: Category[];

  isActive: boolean;

  imageUrl: string;
}
