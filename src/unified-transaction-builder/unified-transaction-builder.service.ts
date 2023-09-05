import { Injectable } from '@nestjs/common';
import { UnifiedTxnBuilderInterface } from './interfaces/UnifiedTxn-Builder.interface';
// TODO: fix configs
// eslint-disable-next-line prettier/prettier
import { TransactionSource, TransactionType, UnifiedTxn, UnifiedTxnAmount } from 'src/DTO/unified-txn.dto';
import { toUnifiedTxnFormat } from './helpers/toUnifiedTxnFormat';

@Injectable()
export class UnifiedTransactionBuilder implements UnifiedTxnBuilderInterface {
  private unifiedTxn: UnifiedTxn = {};

  withId = (id: string) => {
    this.unifiedTxn.id = id;
    return this;
  };

  withCreated = (created: string) => {
    this.unifiedTxn.created = created;
    return this;
  };

  withDescription = (description: string) => {
    this.unifiedTxn.description = description;
    return this;
  };

  withAmount = (amount: UnifiedTxnAmount) => {
    amount.value = toUnifiedTxnFormat(amount.value);
    this.unifiedTxn.amount = amount;
    return this;
  };

  withType = (type: TransactionType) => {
    this.unifiedTxn.type = type;
    return this;
  };

  withMetadata = (metadata: { source: TransactionSource }) => {
    this.unifiedTxn.metadata = metadata;
    return this;
  };

  withReference = (reference: string) => {
    this.unifiedTxn.reference = reference;
    return this;
  };

  build = () => {
    const unifiedTxn = this.unifiedTxn;
    this.unifiedTxn = {};
    return unifiedTxn;
  };
}
