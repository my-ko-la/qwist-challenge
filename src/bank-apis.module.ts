import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MonzoAPIService } from './monzo/monzo-api.service';
import { MonzoTxnTransformStrategy } from './monzo-txn-transform-strategy/monzo-txn-transform-strategy.service';
import { UnifiedTransactionBuilder } from './unified-transaction-builder/unified-transaction-builder.service';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';

@Module({
  imports: [HttpModule],
  controllers: [TransactionsController],
  providers: [MonzoAPIService, MonzoTxnTransformStrategy, UnifiedTransactionBuilder, TransactionsService],
})
export class BankApisModule {}
