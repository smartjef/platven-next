"use client";

import { publicNavItems } from "@/constants/data";
import React from "react";
import { Icons } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {};

const PublicNavItems: React.FC<Props> = ({}) => {
  const path = usePathname();

  if (!publicNavItems?.length) {
    return null;
  }
  return (
    <nav className={`grid items-start gap-2 grid-cols-${publicNavItems.length}`}>
      {publicNavItems.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default PublicNavItems;
