import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginReq } from "./dto/login.req";
import { User } from "src/client/entities/user.entity";
import { UserRequest } from "src/client/dto/user.request.dto";
import { UserResponse } from "src/client/dto/user.response.dto";
import { plainToInstance } from "class-transformer";



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

  async register(userRequest: UserRequest): Promise<UserResponse> {
  
      const existingClient = await this.usuarioRepo.findOne({
        where: { email: userRequest.email },
      });
  
      if (existingClient) {
        throw new ConflictException(
          `E-mail ${userRequest.email} já cadastrado.`,
        );
      }
  
     
      userRequest.password = await bcrypt.hash(userRequest.password, 10);
  
      const newUser = this.usuarioRepo.create(userRequest);
      await this.usuarioRepo.save(newUser);
  
      const entity = plainToInstance(UserResponse, newUser, {
      excludeExtraneousValues: true, // só retorna @Expose()
    });
  
     return entity;
    }



}