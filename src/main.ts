import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ads E-commerce Backend')
    .setDescription('Um projeto da cadeira de web III')
    .setVersion('1.0')
    .addTag('Produtos', 'Operações de CRUD e filtros de produtos.')
    .addTag('Categorias', 'Operações de CRUD de categorias.')
    .addTag('Clientes', 'Operações de CRUD de clientes.')
    .addTag('Endereços', 'Operações de CRUD de endereços do cliente.')
    .addTag('Pedidos', 'Gerenciamento de pedidos e status.')
    .addTag('Itens do Pedido', 'Adição/remoção de itens em um pedido.')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
