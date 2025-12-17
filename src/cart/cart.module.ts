import { Cart } from './entity/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';
import { Cart_item } from 'src/cart-item/entity/cartItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,Cart_item])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule { }
