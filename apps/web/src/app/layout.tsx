import type { Metadata } from "next";
import "geist/font/sans";
import "geist/font/mono";
import "./globals.css";
import { Providers } from "@/app/providers";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "LOGOS | Logistics Operations System",
  description: "AI-agentic industrial logistics operations console",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <Providers initialSession={session}>{children}</Providers>
      </body>
    </html>
  );
}
