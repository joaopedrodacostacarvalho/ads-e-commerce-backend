// src/products/dto/product-is-active-filter.dto.ts
// src/products/dto/product-query.dto.ts

import { IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// export class ProductQueryDto {
//   @ApiProperty({ /* ... */ })
//   @IsOptional()
//   // 💡 CORREÇÃO: Verifica se o valor é string vazia antes de tentar o parseInt
//   @Transform(({ value }) => (value === '' ? undefined : parseInt(value, 10))) 
//   @IsNumber()
//   @Min(1)
//   page: number = 1;

//   @ApiProperty({ /* ... */ })
//   @IsOptional()
//   // 💡 CORREÇÃO: Verifica se o valor é string vazia antes de tentar o parseInt
//   @Transform(({ value }) => (value === '' ? undefined : parseInt(value, 10)))
//   @IsNumber()
//   @Min(1)
//   limit: number = 10;
  
//   // O isActive já estava correto para lidar com strings 'true'/'false'.
//   @ApiProperty({ /* ... */ })
//   @IsOptional()
//   @IsBoolean()
//   @Transform(({ value }) => {
//     if (value === 'true' || value === '1') return true;
//     if (value === 'false' || value === '0') return false;
//     // Se não for uma string booleana, é retornado para o validador.
//     return value; 
//   })
//   isActive?: boolean;
// }