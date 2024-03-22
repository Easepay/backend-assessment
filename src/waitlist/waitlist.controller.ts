import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductWaitlistDTO } from './dto/product.waitlist.dto';
import { UpdateProductWaitlistDTO } from './dto/updateproduct.waitlist.dto';
import { WaitlistService } from './waitlist.service';

@Controller({ path: 'waitlist', version: '1' })
export class WaitlistController {
  constructor(private waitlistService: WaitlistService) {}

  // join waitlist
  @Post()
  joinWaitlist(@Body() { email, fullname }: ProductWaitlistDTO) {
    return this.waitlistService.joinWaitlist({ email, fullname });
  }

    // update waitlist
    @Put("/:id")
    updateWaitlist(@Body() { email }: UpdateProductWaitlistDTO, @Param("id") id: string) {
      return this.waitlistService.updateWaitList(id, email);
    }

  // exit waitlist // ex https://easepay.io/waitlist?email=example.com
  @Get()
  exitWaitlist(@Query('email') email: string) {
    return this.waitlistService.exitWaitlist(email);
  }

  // delete waitlist
  @Delete()
  deleteWaitlist(@Query('email') email: string) {
    return this.waitlistService.deleteWaitlist(email);
  }
}
