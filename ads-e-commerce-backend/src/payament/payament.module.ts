import { Module } from "@nestjs/common";
import { Payament } from "./entity/payament.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PayamentController } from "./payament.controller";
import { PayamentService } from "./payament.service";

@Module({
  imports: [TypeOrmModule.forFeature([Payament])],
  controllers: [PayamentController],
  providers: [PayamentService],
  exports: [PayamentService],
})
export class PayamentModule {}
