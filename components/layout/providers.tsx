"use client";
import React, { useState } from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { Session, SessionContextProvider } from "@/context";
import { User } from "@prisma/client";
export default function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionContextProvider value={{ user, setUser }}>
          {children}
        </SessionContextProvider>
      </ThemeProvider>
    </>
  );
}
