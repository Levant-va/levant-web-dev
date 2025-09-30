import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comicRelief = {
  variable: "--font-comic-relief",
  style: "normal",
  weight: "400",
  src: "url('https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400&display=swap')",
  fallback: ["cursive", "system-ui", "sans-serif"],
};

export const metadata: Metadata = {
  title: "Levant VA - Virtual Airlines",
  description: "Levant Virtual Airlines - Professional Flight Simulation Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comicRelief.variable} antialiased`}
        suppressHydrationWarning
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
