// src/common/dto/pagination-query.dto.ts

// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { Type, Transform } from 'class-transformer';
// import { IsInt, IsOptional, Min, IsString, IsIn } from 'class-validator';

// // Colunas permitidas para ordenação
// export const SORTABLE_COLUMNS = ['name', 'price', 'id'];
// export const DEFAULT_SORT_BY = 'name:ASC'; // Exemplo: name ascendente

// export class PaginationQueryDto {
//   @ApiPropertyOptional({ description: 'Página atual', example: 1, type: Number })
//   @IsOptional()
//   @Transform(({ value }) => (value === '' ? undefined : value))
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   page?: number = 1;

//   @ApiPropertyOptional({ description: 'Limite de itens por página', example: 10, type: Number })
//   @IsOptional()
//   @Transform(({ value }) => (value === '' ? undefined : value))
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   limit?: number = 10;

//   @ApiPropertyOptional({ 
//     description: `Ordenação (coluna:direção). Colunas válidas: ${SORTABLE_COLUMNS.join(', ')}. Ex: name:ASC`, 
//     example: DEFAULT_SORT_BY 
//   })
//   @IsOptional()
//   @IsString()
//   @Transform(({ value }) => (value === '' ? DEFAULT_SORT_BY : value)) // Default se for string vazia
//   @IsIn(
//     SORTABLE_COLUMNS.map(col => [
//       `${col}:ASC`, 
//       `${col}:DESC`
//     ]), 
//     { each: true, message: `A ordenação deve ser um dos valores válidos: coluna:ASC ou coluna:DESC. Colunas: ${SORTABLE_COLUMNS.join(', ')}` }
//   )
//   sortBy?: string = DEFAULT_SORT_BY;
// }