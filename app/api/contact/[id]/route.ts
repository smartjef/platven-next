import { contactFormSchema } from "@/components/forms/contact/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PUT = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  if (
    !z.string().uuid().safeParse(id).success ||
    !(await prisma.contact.findUnique({ where: { id } }))
  )
    return NextResponse.json({ detail: "Contact not found!" }, { status: 404 });
  const data = await request.json();
  const validation = await contactFormSchema.safeParseAsync(data);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  console.log(validation.data);

  const contact = await prisma.contact.update({
    where: { id },
    data: validation.data,
  });
  return NextResponse.json(contact);
};
