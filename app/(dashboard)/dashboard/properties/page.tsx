import BreadCrumb from "@/components/breadcrumb";
import PropertyTable from "@/components/tables/properties-table/property-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSessionUser } from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import React, { FC } from "react";

type Props = {};
const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
];

const Properties: FC<Props> = async ({}) => {
  const user = await getSessionUser();
  const properties = prisma.property.findMany({
    where: { userId: user?.id },
    include: { type: true, requests: true, user: true },
  });
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <PropertyTable properties={properties as any} />
      </div>
    </ScrollArea>
  );
};

export default Properties;
