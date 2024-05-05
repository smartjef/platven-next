import { z } from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(1, "Title required"),
  typeId: z.string().uuid("Invalid property type"),
  status: z.enum(["onRent", "onSale"]).default("onRent"),
  price: z.number({ coerce: true }),
  features: z.string(),
  county: z.string(),
  subCounty: z.string(),
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
