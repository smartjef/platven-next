"use client";
import {
  Contact,
  Property,
  PropertyRequest,
  PropertyType,
} from "@prisma/client";
import React, { FC } from "react";
import { DataTable } from "../data-table";
import { columns } from "./column";
import { useRouter } from "next/navigation";

interface Props {
  messages: PropertyRequest[];
}

const PropertyRequestTable: FC<Props> = ({ messages }) => {
  return (
    <DataTable
      columns={columns}
      data={messages}
      //   onAdd={() => push("/dashboard/properties/add")}
    />
  );
};

export default PropertyRequestTable;
