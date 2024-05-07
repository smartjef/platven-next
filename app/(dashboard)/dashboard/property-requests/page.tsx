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

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
  { title: "Requests", link: "/dashboard/properties/add" },
];
const PropertyRequestsPage: FC<PropsWithSearchParams> = async () => {
  const propertyRequest = await prisma.propertyRequest.findMany({});
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title="Property request" description="" />
        <Separator />
        <div className="shadow overflow-x-auto">
          <div className="grid grid-cols-5 capitalize bg-accent font-bold gap-4 p-2">
            <span>#</span>
            <span>Name</span>
            <span>Email</span>
            <span>Phone number</span>
            <span>Created at</span>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {propertyRequest.map(
              (
                { name, email, phoneNumber, createdAt, isActive, id },
                index,
              ) => (
                <AccordionItem value={id} key={index}>
                  <AccordionTrigger>
                    <div
                      className={clsx("grid grid-cols-5 capitalize gap-4 p-2", {
                        "opacity-50": !isActive,
                      })}
                    >
                      <span>{index + 1}</span>
                      <span>{name}</span>
                      <span>{email}</span>
                      <span>{phoneNumber}</span>
                      <span>{createdAt.toLocaleString()}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PropertyRequestsPage;
