import { z } from "zod";

export const advertValidationSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});
