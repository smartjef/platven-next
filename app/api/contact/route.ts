import { contactFormSchema } from "@/components/forms/contact/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const validation = await contactFormSchema.safeParseAsync(data);
  if (!validation.success) return NextResponse.json(validation.error.format());
  const contact = await prisma.contact.create({ data: validation.data });
  return NextResponse.json(contact);
};
