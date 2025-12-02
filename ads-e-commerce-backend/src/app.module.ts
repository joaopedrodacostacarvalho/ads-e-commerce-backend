import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './client/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { Address } from './address/entities/address.entity';
import { User } from './client/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order-item/entities/order-item.entity';
import { Category } from './category/entities/category.entity';
import { AuthModule } from './auth/auth.module';

@Module({    /*PUXAR DADOS DO .ENV*/
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'ads_e_commerce',
      username: 'root',
      password: '12345678',
      entities: [
        Address,
        Category,
        User,
        Order,
        OrderItem,
        Product,
      ],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    UserModule,
    AddressModule,
    OrderModule,
    OrderItemModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
