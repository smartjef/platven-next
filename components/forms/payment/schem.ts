import { z } from "zod";

export const mpesaPaymentSchema = z.object({
  phoneNumber: z.coerce.number().refine((numb) => {
    const n = String(numb);
    return n.length === 9 && (n.startsWith("1") || n.startsWith("7"));
  }, "Invalid number"),
  property: z.string().uuid("Invalid property"),
});
