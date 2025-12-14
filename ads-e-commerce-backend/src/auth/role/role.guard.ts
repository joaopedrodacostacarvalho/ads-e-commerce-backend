
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

//por que ter essa classe ? como funciona? 
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} //o que é isso? para que serve? por quer ter? 

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;//o que é isso? para que serve? por quer ter? 

    const request = context.switchToHttp().getRequest();//o que é isso? para que serve? por quer ter? 
    const user = request.user; 

    const hasRole = requiredRoles.includes(user.role);//o que é isso? para que serve? por quer ter? 
    if (!hasRole) {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
    }

    return hasRole //o que é isso? para que serve? por quer ter? 
  }
}