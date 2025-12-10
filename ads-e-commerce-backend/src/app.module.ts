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
import { Cart } from './cart/entity/cart.entity';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cartItem.module';
import { Cart_item } from './cart-item/entity/cartItem.entity';
import { Payament } from './payament/entity/payament.entity';
import { PayamentModule } from './payament/payament.module';

@Module({    /*PUXAR DADOS DO .ENV*/
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'meubancotest2',
      username: 'root',
      password: '12345678',
      entities: [
        Address,
        Category,
        User,
        Order,
        OrderItem,
        Product,
        Cart,
        Cart_item,
        Payament
      ],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    UserModule,
    AddressModule,
    OrderModule,
    OrderItemModule,
    AuthModule,
    CartModule,
    CartItemModule,
    PayamentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
