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

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
  { title: "Requests", link: "/dashboard/properties/add" },
];
const PropertyRequestsPage: FC<PropsWithSearchParams> = () => {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title="Property request" description="" />
        <Separator />
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ScrollArea>
  );
};

export default PropertyRequestsPage;
