import prisma from "@/prisma/client";
import BreadCrumb from "@/components/breadcrumb";
import PropertyForm from "@/components/forms/properties/properties-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { FC } from "react";
import { PropsWithPathParams } from "@/types";

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
  { title: "Add", link: "/dashboard/properties/add" },
];

const PropertyUpdatePage: FC<PropsWithPathParams> = async ({
  params: { id },
}) => {
  const property = await prisma.property.findUnique({ where: { id } });
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <PropertyForm
          property={
            { ...property, price: Number(property?.price) as any } as any
          }
        />
      </div>
    </ScrollArea>
  );
};

export default PropertyUpdatePage;
