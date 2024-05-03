import prisma from "@/prisma/client";
import { PropsWithPathParams } from "@/types";
import React, { FC } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/dist/server/api-utils";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import clsx from "clsx";
import ImageDisplay from "@/components/ImageDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
  { title: "Preview", link: "" },
];
const PropertyPreview: FC<PropsWithPathParams> = async ({ params: { id } }) => {
  const property = await prisma.property.findUnique({
    where: { id },
    include: { type: true },
  });
  if (!property) return <div>Not found!</div>;
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 lg:w-[50%]">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title={property.title} description="Preview property" />
        <Separator />
        <div className="w-ful h-[50vh]">
          <ImageDisplay images={property.images} />
        </div>
        <div className="shadow-md p-4 space-y-3 shadow-slate-400 dark:shadow-slate-700">
          <h1 className="text-2xl">Features</h1>
          <p className="opacity-50">{property.features}</p>
        </div>
        <div className="shadow-md p-4 space-y-3  shadow-slate-400 dark:shadow-slate-700">
          <h1 className="text-2xl">Details</h1>
          <div className="grid grid-cols-2">
            <span>County</span>
            <span>{property.county}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Sub county</span>
            <span>{property.subCounty}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Price</span>
            <span>{Number(property.price)}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Status</span>
            <span>{property.status}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Type</span>
            <span>{property.type.title}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>IsActive</span>
            <span>
              {property.isActive ? (
                <Badge>Active</Badge>
              ) : (
                <Badge>Inactive</Badge>
              )}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span>IsListed</span>
            <span>
              {property.listed ? (
                <Badge>Listed</Badge>
              ) : (
                <Badge>Unlisted</Badge>
              )}
            </span>
          </div>
        </div>
        <Button className="w-full">Actions</Button>
      </div>
    </ScrollArea>
  );
};

export default PropertyPreview;
