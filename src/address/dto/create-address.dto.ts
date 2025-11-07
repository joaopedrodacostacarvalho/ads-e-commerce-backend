import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  @IsString({ message: 'A rua deve ser uma string' })
  @MaxLength(100)
  street: string;

  @IsNotEmpty({ message: 'O número é obrigatório' })
  @IsString({ message: 'O número deve ser uma string' })
  @MaxLength(10)
  number: number;

  @IsOptional()
  @IsString({ message: 'O complemento deve ser uma string' })
  @MaxLength(100)
  complement: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @IsString({ message: 'A cidade deve ser uma string' })
  @MaxLength(100)
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @IsString({ message: 'O estado deve ser uma string' })
  @MaxLength(100)
  state: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  @IsString({ message: 'O CEP deve ser uma string' })
  @MaxLength(10)
  zipCode: string;

  @IsOptional()
  @IsBoolean({ message: 'isDefault deve ser um booleano' })
  isDefault: boolean;

  @IsNotEmpty({ message: 'O clientId é obrigatório' })
  @Type(() => Number) // Garante que o valor (mesmo que venha como string) seja tratado como Number
  @IsInt({ message: 'O clientId deve ser um número inteiro' })
  @IsPositive({ message: 'O clientId deve ser positivo' })
  clientId: number;
}
