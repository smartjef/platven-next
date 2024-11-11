import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://platven.ke"),
  title: "Platven LTD",
  description: "Real estate platform",
  openGraph: {
    title: "Platven LTD - Real Estate Platform",
    description:
      "Discover amazing properties on Platven, your go-to real estate platform.",
    url: "https://platven.ke",
    siteName: "Platven LTD",
    type: "website",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
