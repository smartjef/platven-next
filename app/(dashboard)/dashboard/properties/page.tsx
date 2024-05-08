import BreadCrumb from "@/components/breadcrumb";
import PropertyTable from "@/components/tables/properties-table/property-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSessionUser } from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import { PropsWithSearchParams } from "@/types";
import React, { FC } from "react";

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
];

const Properties: FC<PropsWithSearchParams> = async ({ searchParams }) => {
  const user = await getSessionUser();
  const properties = await prisma.property.findMany({
    where: {
      userId: user?.isStaff ? undefined : user?.id,
      OR: [
        { title: { contains: searchParams?.search, mode: "insensitive" } },
        { county: { contains: searchParams?.search, mode: "insensitive" } },

        {
          subCounty: {
            contains: searchParams?.search,
            mode: "insensitive",
          },
        },
        {
          features: { contains: searchParams?.search, mode: "insensitive" },
        },
        {
          rejectionReason: {
            contains: searchParams?.search,
            mode: "insensitive",
          },
        },
        {
          type: {
            title: { contains: searchParams?.search, mode: "insensitive" },
          },
        },
      ],
    },
    include: { type: true, requests: true, user: true, payment: true },
  });
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <PropertyTable properties={JSON.parse(JSON.stringify(properties))} />
      </div>
    </ScrollArea>
  );
};

export default Properties;
