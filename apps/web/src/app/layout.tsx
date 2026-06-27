import type { Metadata } from "next";
import "geist/font/sans";
import "geist/font/mono";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "LOGOS | Logistics Operations System",
  description: "AI-agentic industrial logistics operations console",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
