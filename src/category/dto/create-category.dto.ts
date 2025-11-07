import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(100, { message: 'O nome pode ter no máximo 100 caracteres' })
  name: string;
}
