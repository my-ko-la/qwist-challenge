import { Injectable } from '@nestjs/common';
import { TransactionSource, TransactionType } from 'src/DTO/unified-txn.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';

@Injectable()
export class MonzoTxnTransformStrategy {
  constructor(private readonly UnifiedTransactionBuilder: UnifiedTransactionBuilder) {}

  transform(txn) {
    console.log(`Transforming Monzo txn: ${txn.id}`, txn);
    return this.UnifiedTransactionBuilder.withId(txn.id)
      .withCreated(txn.created)
      .withDescription(txn.description)
      .withAmount({
        value: txn.amount > 0 ? `${txn.amount}` : `-${txn.amount}`,
        currency: txn.currency,
      })
      .withType(txn.amount > 0 ? TransactionType.DEBIT : TransactionType.CREDIT)
      .withReference(txn.metadata.reference)
      .withMetadata({ source: TransactionSource.MONZO })
      .build();
  }
}
