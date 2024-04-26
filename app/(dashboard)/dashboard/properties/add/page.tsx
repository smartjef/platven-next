"use client";

import BreadCrumb from "@/components/breadcrumb";
import PropertyForm from "@/components/forms/properties/properties-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
  { title: "Add", link: "/dashboard/properties/add" },
];
const AddProperty = () => {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <PropertyForm />
      </div>
    </ScrollArea>
  );
};

export default AddProperty;
