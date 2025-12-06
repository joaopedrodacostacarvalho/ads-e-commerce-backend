import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetSellerId = createParamDecorator(
  // O parâmetro 'data' não será usado aqui, mas é necessário para a assinatura do decorator
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    // 💡 O 'sub' é onde você está armazenando o ID do usuário no seu payload JWT
    // Se o seu payload é { sub: user.id, ... }, o ID estará em request.user.sub
    return request.user.sub; 
  },
);