import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import StaffDataTable from "@/components/tables/user-tables/staffs-data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prisma from "@/prisma/client";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default async function page() {
  const users = await prisma.user.findMany({
    where: { isStaff: true },
    include: { team: true },
  });
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Staffs (${users.length})`}
            description="Manage users"
          />
        </div>
        <Separator />
        <StaffDataTable users={users} />
      </div>
    </>
  );
}
