import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundSoul from "@/components/ui/BackgroundSoul";
import SquareGridBackground from "@/components/ui/SquareGridBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dipanshu Daiya | Full Stack Developer",
  description: "Portfolio of Dipanshu Daiya — Full Stack Developer specializing in React, Node.js & MySQL.",
  keywords: ["Full Stack Developer", "React", "Node.js", "Portfolio", "Dipanshu Daiya"],
};

// Preconnect links exported so Next.js injects them in <head> early
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoaderTrigger from "@/components/ui/GlobalLoaderTrigger";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external icon/image CDNs to speed up FCP */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://img.icons8.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.icons8.com" />
      </head>
      <body className="antialiased overflow-x-hidden selection:bg-indigo-600 selection:text-white bg-[#f8fafc] dark:bg-[#030303]">
        <LoadingProvider>
          <GlobalLoaderTrigger />
          <BackgroundSoul />
          <SquareGridBackground />
          <ScrollProgress />
          <CustomCursor />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
