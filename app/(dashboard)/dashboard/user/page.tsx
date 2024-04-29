import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import UsersDataTable from "@/components/tables/user-tables/users-datatable";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prisma from "@/prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default async function page() {
  const users = await prisma.user.findMany({ where: { isStaff: false } });
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Users (${users.length})`}
            description="Manage users"
          />
        </div>
        <Separator />
        <UsersDataTable users={users} />
      </div>
    </>
  );
}
