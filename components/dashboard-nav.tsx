"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import SidebarItem from "./sidebar/side-bar-item";
import useSessionContext from "@/hooks/useSessionContext";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const { user } = useSessionContext();
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map(
        (
          { roles, title, href, icon, disabled, description, external, label },
          index,
        ) => {
          if (!user) return false;
          const userRoles = [
            ...(user.isStaff
              ? ["staff"]
              : user.isSuperUser
              ? ["admin"]
              : ["client"]),
          ];
          const isEligible = roles.some((r) => userRoles.includes(r));

          if (!isEligible) return false;
          return (
            href && (
              <SidebarItem
                href={href}
                title={title}
                disabled={disabled}
                onClick={() => setOpen?.(false)}
                prefixIcon={icon}
                key={index}
              />
            )
          );
        },
      )}
    </nav>
  );
}
