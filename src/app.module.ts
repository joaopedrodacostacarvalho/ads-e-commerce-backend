import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ProductModule, CategoryModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
