import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PayamentController } from "./payament.controller";
import { PayamentService } from "./payament.service";
import { Order } from "src/order/entities/order.entity";
import { OrderModule } from "src/order/order.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order]),OrderModule],
  controllers: [PayamentController],
  providers: [PayamentService],
  exports: [PayamentService],
})
export class PayamentModule {}
