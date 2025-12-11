import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from 'src/client/user.module';
import { Order } from './entities/order.entity';
import { OrderItemModule } from 'src/order-item/order-item.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/client/user.module';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { CartModule } from 'src/cart/cart.module';
import { Cart } from 'src/cart/entity/cart.entity';
import { Cart_item } from 'src/cart-item/entity/cartItem.entity';
import { OrderExpirationService } from 'src/job/job.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem,Cart, Cart_item]),
    UserModule, // Para validar a existência do cliente
    OrderItemModule, // Para acesso ao serviço de Itens do Pedido
    ProductModule,
    CartModule
  ],
  controllers: [OrderController],
  providers: [OrderService,OrderExpirationService],
  exports: [OrderService],
})
export class OrderModule { }
