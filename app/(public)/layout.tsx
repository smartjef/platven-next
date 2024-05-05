import LowerNavBar from "@/components/layout/lower-nav";
import NavBar from "@/components/layout/nav-bar";
import React, { PropsWithChildren } from "react";

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <NavBar />
      <LowerNavBar />
      <main className="w-full pt-16">{children}</main>
    </div>
  );
};

export default PublicLayout;
