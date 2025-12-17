import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../role/user.role";


export class RegisterReq {
 @ApiProperty({ description: 'Nome completo do cliente', example: 'Carlos Alberto' })
   @IsNotEmpty({ message: 'O nome é obrigatório' })
   @IsString({ message: 'O nome deve ser uma string' })
   @MaxLength(255, { message: 'O nome pode ter no máximo 255 caracteres' })
   name: string;
 
   @ApiProperty({ description: 'E-mail para login (deve ser único)', example: 'carlos.alberto@exemplo.com' }) 
   @IsNotEmpty({ message: 'O e-mail é obrigatório' })
   @IsEmail({}, { message: 'O e-mail deve ser válido' })
   @MaxLength(150, { message: 'O e-mail pode ter no máximo 150 caracteres' })
   email: string;
 
   @ApiProperty({ description: 'Senha de acesso (mínimo 8 caracteres)', example: 'SenhaForte123!', writeOnly: true })
   @IsNotEmpty({ message: 'A senha é obrigatória' })
   @IsString({ message: 'A senha deve ser uma string' })
   @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
   password: string;
 
   @ApiProperty({ description: 'Número de telefone (Opcional, máximo 20 caracteres)', example: '5511999991234', required: false })
   @IsString({ message: 'O número de telefone deve ser uma string' })
   @MaxLength(20, {
     message: 'O número de telefone pode ter no máximo 20 caracteres',
   })
   phone: string;
 
   @ApiProperty({ description: 'Papel de acesso: consumidor ou vendedor', example: 'consumidor ou vendedor', required: true })
   @IsString({ message: 'Role de acesso é uma string' })
   @MaxLength(20, {
     message: 'preencha a role do usuario: consumidor ou vendedor',
   })
   role: UserRole;


   //ENDERECO

   @ApiProperty({ description: 'Nome da rua/avenida', example: 'Rua Principal' })
     
     street: string;
   
     @ApiProperty({ description: 'Número do imóvel', example: '123 A' })
     number: number;
   
     @ApiProperty({ description: 'Complemento (apto, bloco, etc.)', example: 'Apto 401', nullable: true })
     complement: string;
   
     @ApiProperty({ description: 'Cidade', example: 'São Paulo' })
     city: string;
   
     @ApiProperty({ description: 'Estado', example: 'SP' })
     state: string;
   
     @ApiProperty({ description: 'CEP', example: '01000-000' })
     zipCode: string;



 


}