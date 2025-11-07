import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString({ message: `Nome do produto precisa ser uma string` })
  @MinLength(2, { message: `Conter ao menos 2 caracteres` })
  @MaxLength(255, { message: `Conter até 255 caracteres` })
  name?: string;

  @IsOptional()
  @IsString({ message: `Descrição do produto precisa ser uma string` })
  description?: string;

  @IsOptional()
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2,
    },
    { message: `O preço deve ser um número` },
  )
  @IsPositive({ message: `O preço deve ser positivo` })
  @Min(0.1, { message: `O valor mínimo deve ser R$ 0,10` })
  price?: number;

  @IsOptional()
  @IsInt({ message: `O estoque deve ser um número inteiro` })
  @IsPositive({ message: `O estoque deve ser positivo` })
  stock?: number;

  @IsOptional()
  @IsInt({ message: `O id da categoria deve ser um número inteiro` })
  @IsPositive({ message: `O id da categoria deve ser positivo` })
  categoryId?: number;

  @IsOptional()
  @IsUrl({}, { message: `Precisa ser uma URL válida` })
  imageUrl?: string;

  @IsOptional()
  @IsBoolean({ message: `O status deve ser um booleano` })
  isActive?: boolean;
}
