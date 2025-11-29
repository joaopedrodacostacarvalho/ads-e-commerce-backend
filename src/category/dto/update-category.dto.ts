import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(100, { message: 'O nome pode ter no máximo 100 caracteres' })
  name?: string;

  // @IsOptional()
  // @IsBoolean({ message: 'O status ativo deve ser um booleano' })
  // isActive?: boolean;
}
