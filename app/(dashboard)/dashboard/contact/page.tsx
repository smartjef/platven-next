import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/breadcrumb";
import MessagesTable from "@/components/tables/messages/messages-table";
import prisma from "@/prisma/client";
const breadcrumbItems = [{ title: "Messages", link: "/dashboard/contact" }];




const Contact = async () => {
  const contacts = await prisma.contact.findMany();
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
