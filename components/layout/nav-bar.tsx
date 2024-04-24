import Link from "next/link";
import React from "react";
import Logo from "../Logo";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { UserNav } from "./user-nav";
import PublicMobileSidebar from "./public-mobile-sidebar";
import PublicNav from "../public-nav";
import PublicNavItems from "./public-nav-items";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/"} target="_blank">
            <Logo />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <PublicMobileSidebar />
        </div>
        <div className={cn("hidden lg:!block")}>
          <PublicNavItems />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
