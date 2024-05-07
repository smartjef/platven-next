import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number required" })
    .max(9, { message: "Invalid phone number" }),
  message: z.string().min(1, { message: "You must leave your message" }),
});
