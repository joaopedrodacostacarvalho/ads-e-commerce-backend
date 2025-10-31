import { Category } from "src/category/category.entity";

export class Product {
    name: string;
    description: string;
    price: number;
    category: Category[];
    isActive: boolean;
    image: string;
}