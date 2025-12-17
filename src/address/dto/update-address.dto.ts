import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { ApiPropertyOptional } from '@nestjs/swagger'; 

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
