import type { Metadata } from "next";
import { Fira_Code, Lato } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/layout/NavBar";

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-sans",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUG@UoA — Linux Users Group at University of Auckland",
  description:
    "A club where we build, share, and talk about Linux, the free and open source operating system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable} ${lato.variable}`}>
      <body className="bg-black text-white">
        <div className="relative flex flex-col h-screen overflow-hidden">
          <NavBar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
