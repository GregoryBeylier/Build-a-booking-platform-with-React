import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HideOnDesktop from "@/components/layout/HideOnDesktop";

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasa",
  description: "Location de logement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <HideOnDesktop paths={["/messages"]}>
          <Header />
        </HideOnDesktop>
        <main className="bg-[#FFFBF9] flex-1 px-4">{children}</main>
        <HideOnDesktop paths={["/messages"]}>
          <Footer />
        </HideOnDesktop>
      </body>
    </html>
  );
}
