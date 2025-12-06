import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from 'src/client/user.module';
import { Order } from './entities/order.entity';
import { OrderItemModule } from 'src/order-item/order-item.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/client/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule, // Para validar a existência do cliente
    OrderItemModule, // Para acesso ao serviço de Itens do Pedido
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule { }
