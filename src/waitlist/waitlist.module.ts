import { Module } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistController } from './waitlist.controller';
import { ProductWaitlist } from '../entities/product.waitlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [WaitlistService],
  controllers: [WaitlistController],
  imports: [
    TypeOrmModule.forFeature([ProductWaitlist]),
    BullModule.registerQueueAsync({
      name:'easepay-email-queue',
    }),
  ],
})
export class WaitlistModule {}
