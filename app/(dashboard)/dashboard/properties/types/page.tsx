import BreadCrumb from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSessionUser } from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import clsx from "clsx";
import { Plus, Trash2, PencilLine } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const breadcrumbItems = [
  { title: "Properties", link: "/dashboard/properties" },
  { title: "Types", link: "/dashboard/properties/types" },
];
type Props = {};

const PropertiesTypes: FC<Props> = async ({}) => {
  const user = await getSessionUser();
  const propertiesTypes = await prisma.propertyType.findMany({
    include: { properties: true },
  });
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between shadow-md p-4 items-center">
          <div className="w-[400px]">
            <Input placeholder="Search ..." />
          </div>
          <Button>
            <Link
              href={"/dashboard/properties/types/add"}
              className="flex space-x-3 items-center"
            >
              <Plus />
              Add Property Type
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {propertiesTypes.map(
            ({ id, isActive, icon, createdAt, title, updatedAt }) => (
              <div
                key={id}
                className="shadow-lg flex space-x-4 relative rounded-sm overflow-hidden bg-accent"
              >
                <Image
                  src={{ src: `/${icon}`, width: 100, height: 100 }}
                  className="w-28 h-28"
                  alt={title}
                />
                <div className="flex flex-col py-4">
                  <h1 className="font-bold text-xl">{title}</h1>
                  <p className="">{isActive ? "Active" : "Inactive"}</p>
                  <p className="">
                    {moment(createdAt).format("Do dd MMM yyy")}
                  </p>
                </div>
                <Badge
                  className={clsx("absolute bottom-2 right-2 cursor-pointer", {
                    "bg-destructive": isActive,
                    "bg-green-900": !isActive,
                  })}
                >
                  {isActive ? "Deactivate" : "Activate"}
                </Badge>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    variant={"default"}
                    size={"icon"}
                    className="bg-green-600"
                  >
                    <PencilLine />
                  </Button>
                  <Button variant={"destructive"} size={"icon"}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default PropertiesTypes;
