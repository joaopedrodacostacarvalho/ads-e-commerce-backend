import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginReq } from "./dto/login.req";
import { User } from "src/client/entities/user.entity";


@Injectable()
export class AuthService{
  constructor(
    @InjectRepository(User)
    private usuarioRepo: Repository<User>,
    
    private jwtService: JwtService,
  ) {}


  async login(data: LoginReq): Promise<{ token: string }> {
    const user = await this.usuarioRepo.findOne({ where: { email: data.email } });
    if (!user) {
      throw new NotFoundException('Usuário inválidos');
    }

    const senhaValida = await bcrypt.compare(data.password, user.password);
    if (!senhaValida) {
      throw new NotFoundException('senha inválidos');
    }

    const payload = { sub: user.id, email: user.email , role:user.role};
    const token = this.jwtService.sign(payload);

    return { token };
  }


  async register(){
    
  }


}