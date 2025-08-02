import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Touch Grass",
  description: "Touch Grass App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preload" as="image" href="/bg-image2.jpg" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Providers>
          <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/bg-image2.jpg')]">
            <Toaster position="top-center" />
            {children}
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
