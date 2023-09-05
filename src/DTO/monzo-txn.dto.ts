import { z } from 'zod';

export const MonzoTxn = z.object({
  id: z.string(),
  created: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.enum(['EUR']),
  metadata: z.object({
    reference: z.string(),
  }),
});

export type MonzoTxnType = z.infer<typeof MonzoTxn>;
