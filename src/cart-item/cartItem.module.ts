import { Module } from "@nestjs/common";
// import { CartItem } from "./entity/cartItem.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemController } from "./cartItem.controller";
import { CartItemService } from "./cartItem.service";
import { Cart_item } from "./entity/cartItem.entity";
import { ProductModule } from "src/product/product.module";
import { CartModule } from "src/cart/cart.module";

@Module({
  imports: [TypeOrmModule.forFeature([Cart_item]), ProductModule, CartModule],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
