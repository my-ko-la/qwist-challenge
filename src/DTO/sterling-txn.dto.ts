import { z } from 'zod';

export const SterlingTxn = z.object({
  id: z.string(),
  currency: z.enum(['EUR']),
  amount: z.string(),
  direction: z.enum(['IN', 'OUT']),
  narrative: z.string(),
  created: z.string(),
  reference: z.string(),
});

export type SterlingTxnType = z.infer<typeof SterlingTxn>;
