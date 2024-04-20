import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  label: z.string(),
  status: z.string(),
  shipped: z.string(),
  delivery: z.string(),
  recipient: z.string(),
  supplier: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
