import { Injectable } from '@nestjs/common';
import { SterlingTxnType } from 'src/DTO/sterling-txn.dto';
import { TransactionSource, TransactionType } from 'src/DTO/unified-txn.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';

@Injectable()
export class SterlingTxnTransformStrategy {
  constructor(private readonly UnifiedTransactionBuilder: UnifiedTransactionBuilder) {}

  transform(txn: SterlingTxnType) {
    return this.UnifiedTransactionBuilder.withId(txn.id)
      .withCreated(txn.created)
      .withDescription(txn.narrative)
      .withAmount({
        // TODO: fix this, and remove last value from
        value: Number(txn.amount) > 0 ? `${Math.abs(Number(txn.amount))}` : `${txn.amount}`,
        currency: txn.currency,
      })
      .withType(Number(txn.amount) > 0 ? TransactionType.CREDIT : TransactionType.DEBIT)
      .withReference(txn.reference)
      .withMetadata({ source: TransactionSource.STERLING })
      .build();
  }
}
