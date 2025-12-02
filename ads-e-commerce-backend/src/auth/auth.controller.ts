import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginReq } from "./dto/login.req";



@Controller('auth')
export class AuthController{

  constructor(
     private authService:AuthService
    ) {}


  @Post("/login")
  async Login(@Body() data:LoginReq): Promise<{ token: string }>{
   const user = await this.authService.login(data)
   return user;
  }

}