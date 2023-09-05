import { Injectable } from '@nestjs/common';
import { MonzoTxnType } from 'src/DTO/monzo-txn.dto';
import { TransactionSource, TransactionType } from 'src/DTO/unified-txn.dto';
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';

@Injectable()
export class MonzoTxnTransformStrategy {
  constructor(private readonly unifiedTransactionBuilder: UnifiedTransactionBuilder) {}

  transform(txn: MonzoTxnType) {
    return this.unifiedTransactionBuilder
      .withId(txn.id)
      .withCreated(txn.created)
      .withDescription(txn.description)
      .withAmount({
        value: Number(txn.amount) > 0 ? `${Math.abs(txn.amount)}` : `${txn.amount}`,
        currency: txn.currency,
      })
      .withType(txn.amount > 0 ? TransactionType.CREDIT : TransactionType.DEBIT)
      .withReference(txn.metadata.reference)
      .withMetadata({ source: TransactionSource.MONZO })
      .build();
  }
}
