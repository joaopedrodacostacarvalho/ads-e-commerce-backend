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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ description: 'Nome do produto (mínimo 2, máximo 255 caracteres)', example: 'Mouse Sem Fio PRO' })
  @IsOptional()
  @IsString({ message: `Nome do produto precisa ser uma string` })
  @MinLength(2, { message: `Conter ao menos 2 caracteres` })
  @MaxLength(255, { message: `Conter até 255 caracteres` })
  name?: string;

  @ApiPropertyOptional({ description: 'Descrição detalhada do produto (Opcional)', example: 'Mouse ergonômico com sensor laser', required: false }) 
  @IsOptional()
  @IsString({ message: `Descrição do produto precisa ser uma string` })
  description?: string;

  @ApiPropertyOptional({ description: 'Preço unitário (mínimo R$ 0,10, máximo 2 casas decimais)', example: 199.90, type: Number })
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

  @ApiPropertyOptional({ description: 'Estoque disponível (deve ser inteiro positivo)', example: 60, type: Number }) 
  @IsOptional()
  @IsInt({ message: `O estoque deve ser um número inteiro` })
  @IsPositive({ message: `O estoque deve ser positivo` })
  stock?: number;

  @ApiPropertyOptional({ description: 'ID da Categoria (para trocar a categoria do produto)', example: 3, type: Number }) 
  @IsOptional()
  @IsInt({ message: `O id da categoria deve ser um número inteiro` })
  @IsPositive({ message: `O id da categoria deve ser positivo` })
  categoryId?: number;

  @ApiPropertyOptional({ description: 'URL da imagem principal do produto', example: 'https://cdn.exemplo.com/mouse-pro.jpg' })
  @IsOptional()
  @IsUrl({}, { message: `Precisa ser uma URL válida` })
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Status de disponibilidade (ativo/inativo)', example: false, type: Boolean }) 
  @IsOptional()
  @IsBoolean({ message: `O status deve ser um booleano` })
  isActive?: boolean;
}
