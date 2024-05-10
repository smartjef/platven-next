"use client";
import useSessionContext from "@/hooks/useSessionContext";
import { cn } from "@/lib/utils";
import { Heart, Search, Text, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Logo from "../Logo";
import { Input } from "../ui/input";
import PublicMobileSidebar from "./public-mobile-sidebar";
import PublicNavItems from "./public-nav-items";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { UserNav } from "./user-nav";

type Props = {};

const NavBar = (props: Props) => {
  const { user } = useSessionContext();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
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
            defaultValue={search}
            onChange={({ target: { value } }) => setSearch(value)}
          />
          <Link
            className="bg-green-700 flex items-center w-1/12  text-background justify-center"
            href={`/properties?search=${search}`}
          >
            <Search />
          </Link>
          <div className="bg-primary flex items-center w-1/12 text-background justify-center">
            <Heart />
          </div>
          <div className="bg-primary w-2/12 flex text-background items-center p-3 space-x-4">
            <User2 className="w-12 h-12" />
            <Link
              className="flex flex-col"
              href={user ? "/dashboard/profile" : "/sign-in"}
            >
              <span>My Account</span>
              <span>{user ? user.name ?? user.email : "Hello, sign in"}</span>
            </Link>
          </div>
          <div className="w-1/12 bg-green-700" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
