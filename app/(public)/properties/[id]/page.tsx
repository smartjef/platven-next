import PropertyRequestForm from "@/components/forms/properties/property-request";
import ImageDisplay from "@/components/ImageDisplay";
import ListLayoutWithSideBar from "@/components/layout/ListLayoutWithSideBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formartCurrency } from "@/lib/utils";
import prisma from "@/prisma/client";
import { PropsWithPathParams } from "@/types";
import { Bookmark, Calendar, Heart } from "lucide-react";
import moment from "moment/moment";
import { redirect } from "next/navigation";
import React, { FC } from "react";

const PropertyDetailPage: FC<PropsWithPathParams> = async ({
  params: { id },
}) => {
  const property = await prisma.property.findUnique({
    where: { id },
    include: { type: true },
  });
  if (!property) redirect("/not-found");
  return (
    <div className="flex flex-col space-y-2">
      <div className="h-[60vh]">
        <ImageDisplay images={property.images} />
      </div>
      <ListLayoutWithSideBar
        sideBar={
          <div className="p-4 shadow shadow-slate-300 dark:shadow-slate-800 rounded-md space-y-4">
            <h1 className="font-bold text-xl">Request Property</h1>
            <PropertyRequestForm property={property as any} />
          </div>
        }
        reverse
      >
        <div className="flex flex-col space-y-2">
          <div className="p-4 shadow shadow-slate-300 dark:shadow-slate-800 rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl">{property.title}</p>
              <div className="flex space-x-2 items-center">
                <Button size={"icon"}>
                  <Bookmark />
                </Button>
                <Button size={"icon"}>
                  <Heart />
                </Button>
              </div>
            </div>
            <div className="flex space-x-4">
              <Badge className="bg-green-700">
                {property.status === "onRent" ? "On rent" : "On sale"}
              </Badge>
              <Badge className="bg-green-700">{property.type.title}</Badge>
            </div>
            <div className="opacity-50 flex space-x-3 items-center text-lg">
              <Calendar />
              {moment(property.createdAt).fromNow()}
              {/* {moment(property.createdAt).format("Do dd MMM yyy")} */}
            </div>
            <p className="font-bold text-xl">
              {formartCurrency(Number(property.price))}
            </p>
          </div>
          <div className="p-4 shadow  shadow-slate-300 dark:shadow-slate-800  rounded-md space-y-4">
            <p className="font-bold text-xl">Property detail</p>
            <p className="opacity-50">{property.features}</p>
          </div>
        </div>
      </ListLayoutWithSideBar>
    </div>
  );
};

export default PropertyDetailPage;
