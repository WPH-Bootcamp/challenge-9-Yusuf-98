import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string().min(2, 'Type at least 2 characters').max(100, 'Query too long').trim(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
