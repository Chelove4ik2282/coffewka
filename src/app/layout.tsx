// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Great_Vibes } from "next/font/google"; 
import Providers from "@/components/Providers"; // импорт обёртки

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "coffeewka",
  description: "my coffee is bigger than ur",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased pt-18 bg-gradient-to-br from-[#1a1a1a] via-[#2b2b2b] to-black`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
