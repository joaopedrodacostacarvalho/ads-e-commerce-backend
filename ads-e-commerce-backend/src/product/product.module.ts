import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { UserModule } from 'src/client/user.module';


@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => CategoryModule),forwardRef(() => UserModule) ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule { }
