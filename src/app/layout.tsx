import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { QueryProvider } from "@/components/query-provider";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slack",
  description: "Slack Clone by Hardik Sadhu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        <Toaster />
        <QueryProvider>
          <NuqsAdapter>{children} </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
