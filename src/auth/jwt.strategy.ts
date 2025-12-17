import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//2 
@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      //É uma função do Passport que diz de onde extrair o token JWT da requisição.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //Isso faz Passport rejeitar tokens expirados.
      ignoreExpiration: false,
      //É a chave que o Passport vai usar para validar o token.
      secretOrKey: 'tacx32566tghyffg8', // dps utilizar um env 
    });
  }

  async validate(payload: any) { 
    // o payload vai virar req.user automaticamente
    return payload;
  }
}