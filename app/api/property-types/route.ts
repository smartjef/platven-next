import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const propertyTypes = await prisma.propertyType.findMany({
    where: { isActive: true },
  });
  return NextResponse.json(propertyTypes);
};
