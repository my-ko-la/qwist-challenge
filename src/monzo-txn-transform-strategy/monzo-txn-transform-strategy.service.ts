import { Injectable } from '@nestjs/common';
import { MonzoTxnType } from 'src/DTO/monzo-txn.dto';
import { TransactionSource, TransactionType } from 'src/DTO/unified-txn.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';

@Injectable()
export class MonzoTxnTransformStrategy {
  constructor(private readonly UnifiedTransactionBuilder: UnifiedTransactionBuilder) {}

  transform(txn: MonzoTxnType) {
    return this.UnifiedTransactionBuilder.withId(txn.id)
      .withCreated(txn.created)
      .withDescription(txn.description)
      .withAmount({
        // TODO: fix this, and remove last value from
        value: Number(txn.amount) > 0 ? `${Math.abs(txn.amount)}` : `${txn.amount}`,
        currency: txn.currency,
      })
      .withType(txn.amount > 0 ? TransactionType.CREDIT : TransactionType.DEBIT)
      .withReference(txn.metadata.reference)
      .withMetadata({ source: TransactionSource.MONZO })
      .build();
  }
}
