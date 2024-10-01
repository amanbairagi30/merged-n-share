import type { Metadata } from "next";
import { Bricolage_Grotesque, Epilogue, Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider";

// primary font
const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: '--font-primary'
});

// secondary font 
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: '--font-secondary'
});

// paragraph/text font 
const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: '--font-paragraph'
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
      <body className={`${epilogue.variable} ${work_sans.variable} ${bricolage.variable} font-primary`}>
        <NextTopLoader color="#2E78C7" height={2} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
