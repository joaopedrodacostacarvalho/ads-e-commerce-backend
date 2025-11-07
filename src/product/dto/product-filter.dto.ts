import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class ProductFilterDto {
  @IsOptional()
  @IsString({ message: `O nome deve ser uma string` })
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: `O id da categoria deve ser um número inteiro` })
  @IsPositive({ message: `O id da categoria deve ser positivo` })
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2,
    },
    { message: `O preço deve ser um número` },
  )
  @Min(0.1, { message: `O valor mínimo deve ser R$ 0,10` })
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2,
    },
    { message: `O preço deve ser um número` },
  )
  @Min(0.1, { message: `O valor mínimo deve ser R$ 0,10` })
  maxPrice?: number;
}
