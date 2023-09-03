import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankApisModule } from './bank-apis.module';
import { MockAPIService } from './mocked-api/mocked-api.service';

@Module({
  imports: [BankApisModule],
  controllers: [AppController],
  providers: [AppService, MockAPIService],
})
export class AppModule {}
