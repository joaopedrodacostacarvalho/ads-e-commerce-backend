import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { Address } from './address/entities/address.entity';
import { Client } from './client/entities/client.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order-item/entities/order-item.entity';
import { Category } from './category/entities/category.entity';

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
        Client,
        Order,
        OrderItem,
        Product,
      ],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    ClientModule,
    AddressModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
