import { Controller, Delete, Get, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { Roles } from "src/auth/role/role.decorator";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { GetSellerId } from "src/auth/role/get.seller.decorator";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/role/role.guard";


@Controller("/cart")
export class CartController{
 
  constructor(
    private cartService: CartService
  ){

  }

   
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('consumidor')
  @Get('/mycarts')
  @ApiOperation({ summary: 'Trazer carrinho do usuario (consumidor) logado' })
  async getMyCart(@GetSellerId() userId: number) {
    (console as any).log(`PEGANDO ID DO USUARIO DO TOKEN:  ${userId}`);
    return this.cartService.getUserCart(userId);
  }

  @ApiBearerAuth('JWT-auth')  //OK
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('consumidor')
  @Delete('/clear')
  async clearCart(@GetSellerId() userId: number) {
    return this.cartService.clearCart(userId);
  }




}