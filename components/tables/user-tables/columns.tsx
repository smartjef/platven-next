"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell(props) {
      const user = props.row.original;
      return (
        <Avatar>
          <AvatarImage
            src={user.image ? `/${user.image}` : undefined}
            alt="avatar"
          />
          <AvatarFallback>
            {(user.name ?? user.email)[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell(props) {
      const name = props.renderValue() as string | undefined;
      return <span>{name ? name : "-"}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE NUMBER",
  },
  {
    accessorKey: "isStaff",
    header: "Role",
    cell(props) {
      const isStaf = props.renderValue();
      return <Badge>{isStaf ? "Staff" : "Client"}</Badge>;
    },
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
    cell(props) {
      const name = props.renderValue() as string | undefined;
      return <span>{name ? name : "-"}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
