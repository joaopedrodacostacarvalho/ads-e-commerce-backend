import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    private categories: Category[] = [];

    findAll(): Category[] {
        return this.categories;
    }

    findOne(id: number): Category {
        const category = this.categories
            .find(category => category.id === id);
        if (category === undefined) {
            throw new Error('Categoria não encontrada');
        }
        return category;
    }

    create(category: Category) {
        this.categories.push(category);
    }

    update(id: number, updatedCategory: Category) {
        const categoryIdx = this.categories
            .findIndex(category => category.id === id);
        if (categoryIdx > -1) {
            this.categories[categoryIdx] = updatedCategory;
        }
    }

    remove(id: number) {
        this.categories = this.categories.
            filter(category => category.id !== id);
    }
}
