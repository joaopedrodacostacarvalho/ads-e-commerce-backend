import { PartialType } from '@nestjs/mapped-types';
import { UserRequest } from './user.request.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientDto extends PartialType(UserRequest) {
  @ApiPropertyOptional({ description: 'Nova senha (será hasheada se fornecida)', example: 'NovaSenhaSegura456', writeOnly: true })
  @IsOptional()
  password?: string;

  
}
