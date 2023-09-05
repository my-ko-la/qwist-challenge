import { Module } from '@nestjs/common';
import { BankApisModule } from './bank-apis.module';
import { MockAPIService } from './mocked-api/mocked-api.service';

@Module({
  imports: [BankApisModule],
  controllers: [],
  providers: [MockAPIService],
})
export class AppModule {}
