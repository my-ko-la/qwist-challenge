import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RevolutTxn = z.object({
  id: z.string(),
  created_at: z.dateString().format('date-time'),
  completed_at: z.dateString().format('date-time'),
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

export class RevolutTxnDto extends createZodDto(RevolutTxn) {}
