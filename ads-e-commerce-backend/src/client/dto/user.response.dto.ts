import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { Address } from "src/address/entities/address.entity";



export class UserResponse {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Expose()
  role: string;
  @Expose()
  registrationDate: Date;

  @ApiProperty({ type: [Address] }) // ou um DTO de Address, se existir
    @Type(() => Address) // Indica o tipo da array
    @Expose()
    addresses: Address;
}
