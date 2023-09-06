import { Injectable } from '@nestjs/common';
import { RevolutTxnType } from 'src/DTO/revolut-txn.dto';
import { TransactionSource, TransactionType } from 'src/DTO/unified-txn.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';
import { resolveToFrom } from './helpers/resolveToFrom';

@Injectable()
export class RevolutTxnTransformStrategy {
  constructor(private readonly UnifiedTransactionBuilder: UnifiedTransactionBuilder) {}

  transform(txn: RevolutTxnType) {
    return this.UnifiedTransactionBuilder.withId(txn.id)
      .withCreated(txn.created_at)
      .withDescription(`Payment ${resolveToFrom(txn.amount.value)} ${txn.counterparty.name}`)
      .withAmount({
        value: Number(txn.amount.value) > 0 ? `${Math.abs(Number(txn.amount.value))}` : `${txn.amount.value}`,
        currency: txn.amount.currency,
      })
      .withType(Number(txn.amount.value) > 0 ? TransactionType.CREDIT : TransactionType.DEBIT)
      .withReference(txn.reference)
      .withMetadata({ source: TransactionSource.REVOLUT })
      .build();
  }
}
