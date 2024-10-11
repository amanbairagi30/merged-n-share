import type { Metadata } from "next";
import { Bricolage_Grotesque, Epilogue, Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const circular = localFont({
  variable: '--font-paragraph',
  display: 'swap',
  src: [
    {
      path: './fonts/CircularStd-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CircularStd-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CircularStd-Book.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})

// primary font
const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: '--font-primary',
  display: "swap",
});

// secondary font 
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: '--font-secondary',
  display: "swap",
});

// // paragraph/text font 
// const epilogue = Epilogue({
//   subsets: ["latin"],
//   weight: ["200", "300", "500", "600", "700", "800"],
//   variable: '--font-paragraph',
//   display: "swap",
// });


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
      <body className={cn(circular.variable, work_sans.variable, bricolage.variable, 'font-primary')}>
        <NextTopLoader color="#2E78C7" height={2} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Providers>
            <main>{children}</main>
          </Providers>
        </ThemeProvider>
        {/* <Analytics /> */}
        <Toaster richColors />
        <script src="https://custom-web-widget.vercel.app/widget.umd.js"></script>
      </body>
    </html >
  );
}
