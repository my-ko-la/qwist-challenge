import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BanksAPIModule } from './BankApiServices/banksAPI.module';

@Module({
  imports: [BanksAPIModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
