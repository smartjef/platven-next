"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import SidebarItem from "./sidebar/side-bar-item";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        return (
          item.href && (
            <SidebarItem
              href={item.href}
              title={item.title}
              disabled={item.disabled}
              onClick={() => setOpen?.(false)}
              prefixIcon={item.icon}
              key={index}
            />
          )
        );
      })}
    </nav>
  );
}
