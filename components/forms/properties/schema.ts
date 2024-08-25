import { z } from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(1, "Title required"),
  typeId: z.string().uuid("Invalid property type"),
  status: z.enum(["onRent", "onSale"]).default("onRent"),
  price: z.number({ coerce: true }),
  features: z.string(),
  county: z.string().min(1, "County Required"),
  subCounty: z.string().min(1, "Sub county required"),
  landMark: z.string().min(1, "Landmark required"),
  roadAccessNature: z.enum(["Highway", "Tarmac", "Murram"]),
  size: z.string().optional(),
  listed: z.boolean({ coerce: true }),
});

export const propertyTypeSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  isActive: z.boolean({ coerce: true }),
  // .transform(str => str === 'true' ? true : str === 'false' ? false : undefined),
});

export const propertyFilterSchema = z.object({
  search: z.string().optional(),
  county: z.string().optional(),
  status: z.enum(["onRent", "onSale"]).default("onRent").optional(),
  typeId: z.string().uuid("Invalid property type").optional(),
  subCounty: z.string().optional(),
  minPrice: z.number({ coerce: true }).optional(),
  maxPrice: z.number({ coerce: true }).optional(),
});

export const propertyRequestFormSchema = z.object({
  propertyId: z.string().uuid(),
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().email(),
  phoneNumber: z.coerce.number().refine((numb) => {
    const n = String(numb);
    return n.length === 9 && (n.startsWith("1") || n.startsWith("7"));
  }, "Invalid number, must follow 710000000"),
  message: z.string().min(1, { message: "You must leave your message" }),
  isAddressed: z.boolean().optional(),
});

export const propertyRejectionSchema = z.object({
  reason: z.string().min(1, { message: "Reason for rejection required" }),
});

export const customPropertyRequestFormSchema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().email({ message: "A valid email is required" }),
  phoneNumber: z.coerce.number().refine((numb) => {
    const n = String(numb);
    return n.length === 9 && (n.startsWith("1") || n.startsWith("7"));
  }, "Invalid number, must follow 710000000"),
  propertyType: z.enum(["Land", "Apartment", "Home", "Rental"]).default("Land"),
  features: z.string().min(10, { message: "Please add features you'd want the property to have" })
});
