import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number required" })
    .max(9, { message: "Invalid phone number" }),
  subject: z.string().min(1, { message: "Subject required" }),
  message: z.string().min(1, { message: "You must leave your message" }),
});
