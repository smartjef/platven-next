import BreadCrumb from "@/components/breadcrumb";
import PropertyTable from "@/components/tables/properties-table/property-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSessionUser } from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import React, { FC } from "react";

import MakePaymentForm from "@/components/forms/payment/make-payment-form";

type Props = {};
const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
];

const Properties: FC<Props> = async ({}) => {
  const user = await getSessionUser();
  const properties = await prisma.property.findMany({
    where: { userId: user?.isActive ? undefined : user?.id },
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
