import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/role/role.decorator';
import { RolesGuard } from 'src/auth/role/role.guard';
import { GetSellerId } from 'src/auth/role/get.seller.decorator';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Get('')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('vendedor')
  async getMySales(@GetSellerId() sellerId: number) {
    (console as any).log(`PEGANDO ID DO USUARIO DO TOKEN:  ${sellerId}`);
    return this.salesService.getSalesBySeller(sellerId);
  }
}
