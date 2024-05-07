import prisma from "@/prisma/client";
import BreadCrumb from "@/components/breadcrumb";
import PropertyForm from "@/components/forms/properties/properties-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { FC } from "react";
import { PropsWithSearchParams } from "@/types";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import clsx from "clsx";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PropertyRequestTable from "@/components/tables/property-requests/property-request-table";

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
  { title: "Requests", link: "/dashboard/properties/add" },
];
const PropertyRequestsPage: FC<PropsWithSearchParams> = async () => {
  const propertyRequest = await prisma.propertyRequest.findMany({
    include: { property: true },
  });
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title="Property request" description="" />
        <Separator />
        <PropertyRequestTable messages={propertyRequest} />
      </div>
    </ScrollArea>
  );
};

export default PropertyRequestsPage;
