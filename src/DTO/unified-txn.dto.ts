import { z } from 'zod';

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum TransactionSource {
  REVOLUT = 'revolut',
  STERLING = 'sterling',
  MONZO = 'monzo',
}

export const UnifiedTxnAmount = z.object({
  value: z.string(),
  currency: z.string(),
});

const UnifiedTxn = z.object({
  id: z.string(),
  created: z.string(),
  description: z.string(),
  amount: UnifiedTxnAmount,
  type: z.nativeEnum(TransactionType),
  reference: z.string(),
  metadata: z.object({
    source: z.nativeEnum(TransactionSource),
  }),
});

export type UnifiedTxn = z.infer<typeof UnifiedTxn>;
export type UnifiedTxnAmount = z.infer<typeof UnifiedTxnAmount>;
