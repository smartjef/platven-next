import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Passwod required" })
    .min(4, { message: "Invalid password" }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Required"),
    email: z.string().email({ message: "Enter a valid email address" }),
    phoneNumber: z.string().min(10, { message: "Enter a valid phone number" }),
    type: z.enum(["Organization", "Individual"]),
    identificationNumber: z.string().min(1, "Required"),
    password: z
      .string()
      .min(1, { message: "Passwod required" })
      .min(4, { message: "Invalid password" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must much",
    path: ["confirmPassword"],
  });
