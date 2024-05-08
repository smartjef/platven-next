import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/breadcrumb";
import MessagesTable from "@/components/tables/messages/messages-table";
import prisma from "@/prisma/client";
import { getSessionUser } from "@/lib/auth-utils";
import { notFound } from "next/navigation";
import { PropsWithSearchParams } from "@/types";
const breadcrumbItems = [{ title: "Messages", link: "/dashboard/contact" }];

const Contact: FC<PropsWithSearchParams> = async ({ searchParams }) => {
  const user = await getSessionUser();

  if (!user || !user.isStaff) return notFound();

  const contacts = await prisma.contact.findMany({
    where: {
      AND: [
        {
          OR: [
            { email: { contains: searchParams?.search, mode: "insensitive" } },

            {
              phoneNumber: {
                contains: searchParams?.search,
                mode: "insensitive",
              },
            },
            {
              message: { contains: searchParams?.search, mode: "insensitive" },
            },
            { name: { contains: searchParams?.search, mode: "insensitive" } },
            {
              subject: { contains: searchParams?.search, mode: "insensitive" },
            },
          ],
        },
      ],
    },
  });
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <Heading title="Messages" description="" />
        <MessagesTable messages={contacts} />
      </div>
    </ScrollArea>
  );
};

export default Contact;
