import { propertyRequestFormSchema } from "@/components/forms/properties/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const validation = await propertyRequestFormSchema.safeParseAsync(data);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  //   Ensure property exist
  if (
    !(await prisma.property.findUnique({
      where: { id: validation.data.propertyId },
    }))
  )
    return NextResponse.json(
      { propertyId: { _errors: ["Invalid property"] } },
      { status: 400 },
    );
  const propertyRequest = await prisma.propertyRequest.create({
    data: validation.data,
  });
  return NextResponse.json(propertyRequest);
};
