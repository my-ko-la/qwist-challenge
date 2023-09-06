import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionSource } from 'src/DTO/unified-txn.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(@Query('source') source?: TransactionSource) {
    try {
      if (source) {
        return await this.transactionsService.getSpecificBankTransactions(source);
      }
      return await this.transactionsService.getAllBankTransactions();
    } catch (error: any) {
      throw error;
    }
  }
}
