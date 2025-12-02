import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginReq {
  
  @IsNotEmpty({ message: 'Email é obrigatório' })
  // @ApiProperty({ example: 'usuario@example.com'})
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'A senha deve tem no mínimo 6 caracteres' })
  // @ApiProperty({ example: 'senha com 6 caracters ou mais'})
  @IsNotEmpty()
  password: string;
}