import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ProductRequest {
  @ApiProperty({ description: 'Nome do produto (mínimo 2, máximo 255 caracteres)', example: 'Mouse Sem Fio X' })
  @IsNotEmpty({ message: `Nome do produto necessário` })
  @IsString({ message: `Nome do produto precisa ser uma string` })
  @MinLength(2, { message: `Conter ao menos 2 caracteres` })
  @MaxLength(255, { message: `Conter até 255 caracteres` })
  name: string;

  @ApiProperty({ description: 'Descrição detalhada do produto (Opcional)', example: 'Mouse ergonômico com sensor óptico', required: false })
  @IsOptional()
  @IsString({ message: `Descrição do produto precisa ser uma string` })
  description: string;

  /* ALTERAR ISSO DAQUI: CHOR: CORREÇÃO NA DOCUMENTACAO SWAGGER PARA CRIACAO DE PRODUTO, RETIRADA DE INFORMACAO INDEVIDA:  111*/
  @ApiProperty({ description: 'Preço unitário (mínimo R$ 0,10, máximo 2 casas decimais)' })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2,
    },
    { message: `O preço deve ser um número` },
  )
  @IsPositive({ message: `O preço deve ser positivo` })
  @IsNotEmpty({ message: `Preço é necessário` })
  @Min(0.1, { message: `O valor mínimo deve ser R$ 0,10` })
  price: number;

  @ApiProperty({ description: 'Estoque inicial do produto (deve ser inteiro positivo)', example: 50, type: Number })
  @IsNotEmpty({ message: `O estoque do produto é necessário` })
  @IsInt({ message: `O estoque deve ser um número inteiro` })
  @IsPositive({ message: `O estoque deve ser positivo` })
  stock: number;

  @ApiProperty({ description: 'ID da Categoria à qual o produto pertence', example: 2, type: Number })
  @IsNotEmpty({ message: `O id de ao menos uma categoria é necessário` })
  @IsInt({ message: `O id da categoria deve ser um número inteiro` })
  @IsPositive({ message: `O id da categoria deve ser positivo` })
  categoryId: number;

  @ApiProperty({ description: 'URL da imagem principal do produto', example: 'https://cdn.exemplo.com/mouse-x.jpg' })
  @IsUrl({}, { message: `Precisa ser uma URL válida` })
  imageUrl: string;
}
