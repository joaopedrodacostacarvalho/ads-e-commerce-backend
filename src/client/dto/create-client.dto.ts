import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(255, { message: 'O nome pode ter no máximo 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser válido' })
  @MaxLength(150, { message: 'O e-mail pode ter no máximo 150 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;

  @IsString({ message: 'O número de telefone deve ser uma string' })
  @MaxLength(20, { message: 'O número de telefone pode ter no máximo 20 caracteres' })
  phone: string;

  registrationDate: Date;
}
