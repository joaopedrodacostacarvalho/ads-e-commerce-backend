import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemService } from './order-item.services';
import { OrderItemController } from './order-item.controller';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    ProductModule,
    forwardRef(() => OrderModule),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService], // Exporta para o OrderService
})
export class OrderItemModule { }
