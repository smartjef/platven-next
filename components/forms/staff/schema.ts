import { z } from "zod";

export const staffFormSchema = z.object({
  isActive: z.boolean({ coerce: true }),
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().min(1, { message: "Invalid phone number" }),
  address: z.string().min(1, { message: "Address required" }),
  position: z.string().min(1, { message: "Position required" }),
});

export const userFormSchema = z.object({
  name: z.string().min(1, { message: "Name required" }).optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  phoneNumber: z.string().min(1, { message: "Invalid phone number" }).optional(),
  address: z.string().min(1, { message: "Address required" }).optional(),
  isActive: z.boolean({ coerce: true }).optional(),
});
