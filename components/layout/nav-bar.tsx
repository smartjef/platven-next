import Link from "next/link";
import React from "react";
import Logo from "../Logo";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { UserNav } from "./user-nav";
import PublicMobileSidebar from "./public-mobile-sidebar";
import PublicNav from "../public-nav";
import PublicNavItems from "./public-nav-items";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Heart, Search, Text, User2 } from "lucide-react";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur z-20">
      <nav>
        <div className="h-14 flex items-center justify-between px-4">
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
        </div>
        <div className="hidden lg:flex h-16 bg-accent">
          <div className="bg-green-700 h-full w-1/12" />
          <div className="bg-primary h-full w-2/12 flex items-center space-x-2 text-green-500 p-3">
            <Text />
            <span>Browse category</span>
          </div>
          <Input
            className="w-4/12 h-full outline-none active:outline-none rounded-none"
            placeholder="Search property ..."
          />
          <div className="bg-green-700 flex items-center w-1/12  text-background justify-center">
            <Search />
          </div>
          <div className="bg-primary flex items-center w-1/12 text-background justify-center">
            <Heart />
          </div>
          <div className="bg-primary w-2/12 flex text-background items-center p-3 space-x-4">
            <User2 className="w-12 h-12" />
            <div className="flex flex-col">
              <span>My Account</span>
              <span>Hello, sign in</span>
            </div>
          </div>
          <div className="w-1/12 bg-primary" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
