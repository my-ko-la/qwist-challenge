import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const MonzoTxn = z.object({
  id: z.string(),
  created: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.enum(['EUR']),
  metadata: z.object({
    reference: z.string(),
  }),
});

export class MonzoTxnDto extends createZodDto(MonzoTxn) {}
