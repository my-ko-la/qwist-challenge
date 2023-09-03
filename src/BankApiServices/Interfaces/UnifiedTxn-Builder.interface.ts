// eslint-disable-next-line prettier/prettier
import { TransactionSource, TransactionType, UnifiedTxnAmount } from 'src/DTO/unified-txn.dto';
import { UnifiedTxn } from 'src/DTO/unified-txn.dto';

export interface UnifiedTxnBuilderInterface {
  withId: (id: string) => UnifiedTxnBuilderInterface;
  withCreated: (created: string) => UnifiedTxnBuilderInterface;
  withDescription: (description: string) => UnifiedTxnBuilderInterface;
  withAmount: (amount: UnifiedTxnAmount) => UnifiedTxnBuilderInterface;
  withType: (type: TransactionType) => UnifiedTxnBuilderInterface;
  withReference: (reference: string) => UnifiedTxnBuilderInterface;
  withMetadata: (metadata: { source: TransactionSource }) => UnifiedTxnBuilderInterface;
  build: () => UnifiedTxn;
}

export type UnifiedTxnBuilder = UnifiedTxnBuilderInterface & UnifiedTxn;
