import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";

const font = Poppins({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: "100xCommunity",
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
        <Toaster />
      </body>
    </html>
  );
}
