import { propertyRequestFormSchema } from "@/components/forms/properties/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// TODO LIMIT ALL EDITS TO STAFFS ONLY
export const PUT = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  if (
    !z.string().uuid().safeParse(id).success ||
    !(await prisma.propertyRequest.findUnique({ where: { id } }))
  )
    return NextResponse.json(
      { detail: "Property Request not found" },
      { status: 404 },
    );
  const data = await request.json();
  const validation = await propertyRequestFormSchema.safeParseAsync(data);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const propRequest = await prisma.propertyRequest.update({
    where: { id },
    data: validation.data,
  });
  return NextResponse.json(propRequest);
};
