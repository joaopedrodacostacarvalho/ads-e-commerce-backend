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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'ads_e_commerce',
      username: 'testuser',
      password: 'testuser123',
      entities: [__dirname + '/**/*.entity{.ts,.js'],
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
