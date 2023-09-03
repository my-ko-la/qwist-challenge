// eslint-disable-next-line prettier/prettier
import { TransactionSource, TransactionType, UnifiedTxnAmount } from 'src/DTO/unified-txn.dto';
import { UnifiedTxn } from 'src/DTO/unified-txn.dto';

export interface UnifiedTxnBuilderInterface {
  withId: (id: string) => this;
  withCreated: (created: string) => this;
  withDescription: (description: string) => this;
  withAmount: (amount: UnifiedTxnAmount) => this;
  withType: (type: TransactionType) => this;
  withReference: (reference: string) => this;
  withMetadata: (metadata: { source: TransactionSource }) => this;
  build: () => UnifiedTxn;
}

export type UnifiedTxnObject = UnifiedTxnBuilderInterface & UnifiedTxn;
