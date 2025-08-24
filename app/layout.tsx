// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroller from "./_components/sections/SmoothScroll";

// 1. Import your new component


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Smooth Scrolling App",
  description: "Next.js 15 with Lenis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Wrap the children with the SmoothScroller */}
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}