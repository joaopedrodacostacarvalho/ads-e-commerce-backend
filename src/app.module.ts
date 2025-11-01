import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
