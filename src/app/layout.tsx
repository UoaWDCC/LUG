import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/primitive/Container";

const primaryFont = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UoA Linux User Group",
  description: "Website for UoA Linux User Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={primaryFont.variable}>
      <body className="bg-white text-black">
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-1">
            <Container>
              {children}
            </Container>
          </main>
          {/* flex-1 ensures page content takes up the full space between navbar and footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
