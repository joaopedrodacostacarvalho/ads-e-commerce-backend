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

export class CreateProductDto {
  @IsNotEmpty({ message: `Nome do produto necessário` })
  @IsString({ message: `Nome do produto precisa ser uma string` })
  @MinLength(2, { message: `Conter ao menos 2 caracteres` })
  @MaxLength(255, { message: `Conter até 255 caracteres` })
  name: string;

  @IsOptional()
  @IsString({ message: `Descrição do produto precisa ser uma string` })
  description?: string;


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

  @IsNotEmpty({ message: `O estoque do produto é necessário` })
  @IsInt({ message: `O estoque deve ser um número inteiro` })
  @IsPositive({ message: `O estoque deve ser positivo` })
  stock: number;

  @IsNotEmpty({ message: `O id de ao menos uma categoria é necessário` })
  @IsInt({ message: `O id da categoria deve ser um número inteiro` })
  @IsPositive({ message: `O id da categoria deve ser positivo` })
  categoryId: number;


  @IsUrl({}, { message: `Precisa ser uma URL válida` })
  imageUrl: string;
}
