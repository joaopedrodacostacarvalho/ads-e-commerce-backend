import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginReq } from "./dto/login.req";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserService } from "src/client/user.service";
import { UserRequest } from "src/client/dto/user.request.dto";
import { UserResponse } from "src/client/dto/user.response.dto";
import { User } from "src/client/entities/user.entity";



@Controller('auth')
export class AuthController{

  constructor(
     private authService:AuthService,
    ) {}


  @Post("/login")
  async Login(@Body() data:LoginReq): Promise<{ token: string }>{
   const user = await this.authService.login(data)
   return user;
  }

  @Post("/register")
    @ApiOperation({ summary: 'Cria um novo usuário (cadastro)' })
    @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.', type: User })
    @ApiResponse({ status: 400, description: 'E-mail já cadastrado ou dados inválidos.' })
    @ApiBody({ type: UserRequest })
    async Register(@Body() createUser: UserRequest): Promise<UserResponse> {
      return this.authService.register(createUser);
    }


    



}