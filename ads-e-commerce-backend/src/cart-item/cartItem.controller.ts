import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { GetSellerId } from "src/auth/role/get.seller.decorator";
import { Roles } from "src/auth/role/role.decorator";
import { cartItemReq } from "./dto/cart.request.dto";
import { CartItemService } from "./cartItem.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/role/role.guard";
import { CartItemUpdate } from "./dto/cartItem.update";


@Controller('cartitem')
export class CartItemController{

  constructor(
    private cartItemService:CartItemService
  ){

  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('consumidor')
  @Post('/add')
  @ApiOperation({ summary: 'Adiciona um cartItem ao cart' })
 async addToCart(
   @GetSellerId() userId: number,
   @Body() dto: cartItemReq 
 ) {
  return this.cartItemService.addItem(userId, dto.productId, dto.quantity);
 }


@Patch('/quantity')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('consumidor')
@ApiBearerAuth('JWT-auth')
@ApiOperation({ summary: 'Atualizar quantidade de um item do carrinho' })
async updateQuantity(
  @GetSellerId() userId: number,
  @Body() dto: CartItemUpdate
) {
  return this.cartItemService.updateQuantity(
    userId,
    dto.cartItemId,
    dto.quantity
  );
}


@Delete('/:cartItemId')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('consumidor')
@ApiBearerAuth('JWT-auth')
@ApiOperation({ summary: 'Remover um item do carrinho' })
async removeItem(
  @GetSellerId() userId: number,
  @Param('cartItemId') cartItemId: number,
) {
  return this.cartItemService.removeItem(userId, cartItemId);
}



}