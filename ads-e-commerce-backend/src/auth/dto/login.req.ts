import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginReq {

  @ApiProperty({ description: 'Preencha o email para login', example: 'user.user@exemplo.com', required: true })
  @IsString({ message: 'O email  deve ser uma string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail()
  email: string;


  @ApiProperty({ description: 'Preencha a senha para login', example: '12345678', required: true })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  password: string;
}