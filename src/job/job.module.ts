import { Module } from '@nestjs/common';
import { OrderExpirationService } from './job.service';


@Module({
  providers: [
    OrderExpirationService,
  ],
})
export class OrderModule {}
