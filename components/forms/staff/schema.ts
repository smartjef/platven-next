import { z } from "zod";

export const staffFormSchema = z.object({
  isStaff: z.boolean({ coerce: true }),
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().min(1, { message: "Invalid phone number" }),
  address: z.string().min(1, { message: "Address required" }),
  position: z.string().min(1, { message: "Position required" }),
});
