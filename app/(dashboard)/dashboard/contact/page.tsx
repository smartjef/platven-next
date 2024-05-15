import BreadCrumb from "@/components/breadcrumb";
import MessagesTable from "@/components/tables/messages/messages-table";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSessionUser } from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import { PropsWithSearchParams } from "@/types";
import { notFound } from "next/navigation";
import { FC } from "react";
const breadcrumbItems = [{ title: "Messages", link: "/dashboard/contact" }];

const Contact: FC<PropsWithSearchParams> = async ({ searchParams }) => {
  const user = await getSessionUser();

  if (!user?.isSuperUser) return notFound();

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
    orderBy: {
      isAddressed: "asc",
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
