import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { ProductWaitlistDTO } from './dto/product.waitlist.dto';

@Controller({ path: 'waitlist', version: '1' })
export class WaitlistController {
  constructor(private waitlistService: WaitlistService) {}

  // join waitlist
  @Post()
  joinWaitlist(@Body() { email, fullname }: ProductWaitlistDTO) {
    return this.waitlistService.joinWaitlist({ email, fullname });
  }

  // exit waitlist // ex https://easepay.io/waitlist?email=example.com
  @Get()
  exitWaitlist(@Query('email') email: string) {
    return this.waitlistService.exitWaitlist(email);
  }

  @Delete()
  deleteWaitlist(@Body() { email }: { email: string }) {
    return this.waitlistService.exitWaitlist(email);
  }
}
