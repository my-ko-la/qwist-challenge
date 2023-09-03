import { Module } from '@nestjs/common';
import { MonzoAPIService } from './MonzoApi/MonzoAPI.service';

@Module({
  imports: [],
  controllers: [MonzoAPIService],
  providers: [],
})
export class BanksAPIModule {}
