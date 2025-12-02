import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; 
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
  @ApiProperty({ description: 'Nome da rua/avenida', example: 'Rua dos Limoeiros' }) 
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  @IsString({ message: 'A rua deve ser uma string' })
  @MaxLength(100)
  street: string;

  @ApiProperty({ description: 'Número do imóvel', example: '450' }) 
  @IsNotEmpty({ message: 'O número é obrigatório' })
  @IsString({ message: 'O número deve ser uma string' })
  @MaxLength(10)
  number: number;

  @ApiPropertyOptional({ description: 'Complemento (opcional)', example: 'Casa 2', required: false }) 
  @IsOptional()
  @IsString({ message: 'O complemento deve ser uma string' })
  @MaxLength(100)
  complement: string;

  @ApiProperty({ description: 'Cidade', example: 'Rio de Janeiro' }) 
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @IsString({ message: 'A cidade deve ser uma string' })
  @MaxLength(100)
  city: string;

  @ApiProperty({ description: 'Estado', example: 'RJ' }) 
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @IsString({ message: 'O estado deve ser uma string' })
  @MaxLength(100)
  state: string;

  @ApiProperty({ description: 'CEP (apenas números ou formatado)', example: '20000-000' }) 
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  @IsString({ message: 'O CEP deve ser uma string' })
  @MaxLength(10)
  zipCode: string;

  @ApiPropertyOptional({ description: 'Definir como endereço padrão do cliente', default: false, type: Boolean }) 
  @IsOptional()
  @IsBoolean({ message: 'isDefault deve ser um booleano' })
  isDefault: boolean; /* Para que serve ?? */

  @ApiProperty({ description: 'ID do Cliente proprietário deste endereço', example: 5, type: Number }) 
  @IsNotEmpty({ message: 'O clientId é obrigatório' })
  @Type(() => Number) // Garante que o valor (mesmo que venha como string) seja tratado como Number
  @IsInt({ message: 'O clientId deve ser um número inteiro' })
  @IsPositive({ message: 'O clientId deve ser positivo' })
  clientId: number;
}
