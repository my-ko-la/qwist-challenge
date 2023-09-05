import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MonzoAPIService } from './monzo/monzo-api.service';
import { MonzoTxnTransformStrategy } from './monzo-txn-transform-strategy/monzo-txn-transform-strategy.service';
import { UnifiedTransactionBuilder } from './unified-transaction-builder/unified-transaction-builder.service';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { RevolutAPIService } from './revolut/revolut-api.service';
import { RevolutTxnTransformStrategy } from './revolut-txn-transform-strategy/revolut-txn-transform-strategy.service';
import { SterlingAPIService } from './sterling/sterling-api.service';
import { SterlingTxnTransformStrategy } from './sterling-txn-transform-strategy/sterling-txn-transform-strategy.service';

@Module({
  imports: [HttpModule],
  controllers: [TransactionsController],
  providers: [
    MonzoAPIService,
    MonzoTxnTransformStrategy,
    RevolutAPIService,
    RevolutTxnTransformStrategy,
    SterlingAPIService,
    SterlingTxnTransformStrategy,
    UnifiedTransactionBuilder,
    TransactionsService,
  ],
})
export class BankApisModule {}
