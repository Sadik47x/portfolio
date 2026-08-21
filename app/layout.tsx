import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AskWidget from "@/components/AskWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sadikmondal.dev"),
  title: "Sadik Mondal — Full-Stack Developer & Software Engineering Student",
  description: "Full-stack developer and Computer Science student building production-ready, verifiably-secure web applications like CleanMess, BeatMess, and RailVista. Deployed on Vercel and Render.",
  keywords: ["Sadik Mondal", "Full-Stack Developer", "Software Engineer", "Kolkata", "Next.js", "TypeScript", "React", "PostgreSQL", "Supabase", "CleanMess", "BeatMess", "RailVista"],
  authors: [{ name: "Sadik Mondal" }],
  openGraph: {
    title: "Sadik Mondal — Full-Stack Developer",
    description: "Computer Science student building secure, high-performance web products. Check out my case studies for CleanMess, BeatMess, and RailVista.",
    url: "https://sadikmondal.dev",
    siteName: "Sadik Mondal Portfolio",
    images: [
      {
        url: "/images/hero-portrait.png",
        width: 800,
        height: 1000,
        alt: "Sadik Mondal Portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadik Mondal — Full-Stack Developer",
    description: "Computer Science student building secure, high-performance web products.",
    images: ["/images/hero-portrait.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="antialiased bg-[#FAFAF9] text-[#111111] dark:bg-[#0B0B0D] dark:text-[#F5F5F4] transition-colors duration-300 min-h-screen flex flex-col">
        {children}
        <AskWidget />
      </body>
    </html>
  );
}
