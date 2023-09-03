import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SterlingTxn = z.object({
  id: z.string(),
  currency: z.enum(['EUR']),
  amount: z.string(),
  direction: z.enum(['OUT']),
  narrative: z.string(),
  created: z.dateString().format('date-time'),
  reference: z.string(),
});

export class SterlingTxnDto extends createZodDto(SterlingTxn) {}
