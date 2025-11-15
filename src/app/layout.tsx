import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { ConditionalHeader, ConditionalFooter, ConditionalMain } from "@/components/conditional-header";

export const metadata: Metadata = {
  title: "Glamour Nails",
  description: "Nail salon booking website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <ConditionalHeader />
            <ConditionalMain>{children}</ConditionalMain>
            <ConditionalFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
