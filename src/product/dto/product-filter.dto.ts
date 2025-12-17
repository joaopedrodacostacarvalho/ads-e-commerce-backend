import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({ description: 'Filtro parcial por nome do produto', example: 'Mouse' }) 
  @IsOptional()
  @IsString({ message: `O nome deve ser uma string` })
  name?: string;

  @ApiPropertyOptional({ description: 'Filtro por ID da Categoria', example: 2, type: Number }) 
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: `O id da categoria deve ser um número inteiro` })
  @IsPositive({ message: `O id da categoria deve ser positivo` })
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Preço mínimo do produto na busca', example: 50.00, type: Number })
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

  @ApiPropertyOptional({ description: 'Preço máximo do produto na busca', example: 300.00, type: Number }) 
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
