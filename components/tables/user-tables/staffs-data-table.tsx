"use client";
import React, { FC } from "react";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  users: User[];
}

const StaffDataTable: FC<Props> = ({ users }) => {
  const router = useRouter();
  return (
    <DataTable
      columns={columns}
      data={users}
      onAdd={() => router.push(`/dashboard/staff/add`)}
    />
  );
};

export default StaffDataTable;
