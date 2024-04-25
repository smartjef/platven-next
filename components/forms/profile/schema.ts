import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().min(1, { message: "Invalid phone number" }),
  address: z.string(),
});
