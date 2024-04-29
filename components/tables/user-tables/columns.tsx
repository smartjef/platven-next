"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Team, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const columns = (isStaff = false) =>
  [
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
    ...(isStaff
      ? [
          {
            accessorKey: "team.image",
            header: "Image",
            cell(props: any) {
              const user = props.row.original;
              return (
                <Avatar>
                  <AvatarImage
                    src={user?.team?.image ? `/${user.team.image}` : undefined}
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
            accessorKey: "team.position",
            header: "POSITION",
          },
        ]
      : [
          {
            accessorKey: "image",
            header: "Image",
            cell(props: any) {
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
        ]),

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
  ] as ColumnDef<User>[];
