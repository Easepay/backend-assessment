import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AUTH_SERVICE_NAME } from './proto/auth.pb';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // REST health check request handler
  @Get('/')
  restHealthCheck() {
    return { status: 'Service active!' };
  }
}
