import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundSoul from "@/components/ui/BackgroundSoul";
import SquareGridBackground from "@/components/ui/SquareGridBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-indigo-600 selection:text-white bg-[#f8fafc] dark:bg-[#030303]">
        <BackgroundSoul />
        <SquareGridBackground />
        <ScrollProgress />
        <CustomCursor />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
