import { Controller, Get } from '@nestjs/common';
import { MockAPIService } from './mocked-api/mocked-api.service';

@Controller()
export class AppController {
  constructor(private readonly mockAPIService: MockAPIService) {}

  @Get()
  getHello() {
    return 'benis';
    // return this.appService.getHello();
  }
}
