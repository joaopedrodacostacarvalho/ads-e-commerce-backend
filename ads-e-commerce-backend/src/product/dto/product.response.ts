import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsPositive,  isString,  IsString, Min } from "class-validator";
import { isNotNil } from "nestjs-paginate/lib/helper";

export class ProductResponse {
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  stock: number;
  @Expose()
  price: number;
  @Expose()
  categoryId: number;
  @Expose()
  category: string;
  @Expose()
  isActive: number;
  @Expose()
  seller: string;
  @Expose()
  imageUrl: string;

}