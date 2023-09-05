import { Injectable } from '@nestjs/common';
import { RevolutTxnType } from 'src/DTO/revolut-txn.dto';
import { TransactionSource, TransactionType } from 'src/DTO/unified-txn.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';

@Injectable()
export class RevolutTxnTransformStrategy {
  constructor(private readonly UnifiedTransactionBuilder: UnifiedTransactionBuilder) {}

  transform(txn: RevolutTxnType) {
    return this.UnifiedTransactionBuilder.withId(txn.id)
      .withCreated(txn.created_at)
      .withDescription(`Payment to ${txn.counterparty.name}`)
      .withAmount({
        // TODO: fix this, and remove last value from
        value: Number(txn.amount) > 0 ? `${Math.abs(Number(txn.amount.value))}` : `${txn.amount.value}`,
        currency: txn.amount.currency,
      })
      .withType(Number(txn.amount.value) > 0 ? TransactionType.DEBIT : TransactionType.CREDIT)
      .withReference(txn.reference)
      .withMetadata({ source: TransactionSource.REVOLUT })
      .build();
  }
}