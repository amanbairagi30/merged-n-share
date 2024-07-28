import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "M&S",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextTopLoader color="#2E78C7" height={2} />
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
