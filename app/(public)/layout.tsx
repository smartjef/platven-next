import NavBar from "@/components/layout/nav-bar";
import React, { PropsWithChildren } from "react";

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="w-full pt-16">{children}</main>
    </>
  );
};

export default PublicLayout;
