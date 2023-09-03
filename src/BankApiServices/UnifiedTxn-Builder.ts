import { Injectable } from '@nestjs/common';
import { UnifiedTxnBuilder } from './Interfaces/UnifiedTxn-Builder.interface';
// TODO: fix configs
// eslint-disable-next-line prettier/prettier
import { TransactionSource, TransactionType, UnifiedTxnAmount } from 'src/DTO/unified-txn.dto';

@Injectable()
export class UTBuilder implements UnifiedTxnBuilder {
  constructor(private unifiedTxn: UnifiedTxnBuilder) {}

  withId = (id: string) => {
    this.unifiedTxn.id = id;
    return this.unifiedTxn;
  };

  withCreated = (created: string) => {
    this.unifiedTxn.created = created;
    return this.unifiedTxn;
  };

  withDescription = (description: string) => {
    this.unifiedTxn.description = description;
    return this.unifiedTxn;
  };

  withAmount = (amount: UnifiedTxnAmount) => {
    this.unifiedTxn.amount = amount;
    return this.unifiedTxn;
  };

  withType = (type: TransactionType) => {
    this.unifiedTxn.type = type;
    return this.unifiedTxn;
  };

  withMetadata = (metadata: { source: TransactionSource }) => {
    this.unifiedTxn.metadata = metadata;
    return this.unifiedTxn;
  };

  withReference = (reference: string) => {
    this.unifiedTxn.reference = reference;
    return this.unifiedTxn;
  };

  build = () => {
    return this.unifiedTxn;
  };
}
