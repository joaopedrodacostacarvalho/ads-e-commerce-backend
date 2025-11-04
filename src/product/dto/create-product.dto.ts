import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateProductDto {
  @IsNotEmpty({ message: `Nome do produto necessário` })
  @IsString({ message: `Nome do produto precisa ser uma string` })
  @MinLength(2, { message: `Conter ao menos 2 caracteres` })
  @MaxLength(255, { message: `Conter até 255 caracteres` })
  name: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  }, { message: `O preço deve ser um número` })
  @IsPositive({ message: `O preço deve ser positivo` })
  @IsNotEmpty({ message: `Preço é necessário` })
  @Min(0.10, { message: `O valor mínimo deve ser R$ 0,10` })
  price: number;

  @IsArray({ message: `Categorias precisam ser um array` })
  @ValidateNested()
  @Type(() => Category)
  categories: Category[];

  @IsUrl({}, { message: `Precisa ser uma URL válida` })
  imageUrl: string;
}
