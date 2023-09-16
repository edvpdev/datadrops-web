import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { cn, constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-[calc(100dvh)]">
      <body className={cn("", inter.className)}>
        {/* <Providers>{children}</Providers> */}
        {children}
      </body>
    </html>
  );
}
