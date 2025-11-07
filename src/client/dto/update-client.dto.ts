import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiPropertyOptional({ description: 'Nova senha (será hasheada se fornecida)', example: 'NovaSenhaSegura456', writeOnly: true })
  @IsOptional()
  password?: string;
}
