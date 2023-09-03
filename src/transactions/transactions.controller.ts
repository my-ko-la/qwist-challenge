import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionSource } from 'src/DTO/unified-txn.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions(@Query('source') source: TransactionSource) {
    try {
      if (source) {
        return this.transactionsService.getSpecificBankTransactions(source);
      }
      return this.transactionsService.getBankTransactions();
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }
}
