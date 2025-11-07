import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemService } from './order-item.services';
import { OrderItemController } from './order-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    ProductModule, // Para validar o estoque e obter o preço do produto
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService], // Exporta para o OrderService
})
export class OrderItemModule {}
