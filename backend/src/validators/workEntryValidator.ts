import { z } from 'zod';

const entrySchema = z.object({
  date: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  workType: z.string().min(2, 'Work type must be at least 2 characters'),
  volume: z.number().positive('Volume must be greater than 0').max(999999, 'Volume too large'),
  unit: z.string().min(1, 'Unit is required'),
  performer: z.string().min(3, 'Performer name must be at least 3 characters'),
});

export const validateWorkEntry = (data: any, isPartial = false) => {
  const schema = isPartial ? entrySchema.partial() : entrySchema;
  const result = schema.safeParse(data);
  if (result.success) return { valid: true, data: result.data };
  return { valid: false, errors: result.error.flatten().fieldErrors };
};