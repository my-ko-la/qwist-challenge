import { z } from 'zod';

export const RevolutTxn = z.object({
  id: z.string(),
  created_at: z.string(),
  completed_at: z.string(),
  state: z.enum(['COMPLETED']),
  amount: z.object({
    value: z.string(),
    currency: z.enum(['EUR']),
  }),
  merchant: z.string().nullable(),
  counterparty: z.object({
    id: z.string(),
    name: z.string(),
  }),
  reference: z.string(),
});

export type RevolutTxnType = z.infer<typeof RevolutTxn>;
