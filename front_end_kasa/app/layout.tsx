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

/**
 * Layout racine de l'application : applique la police et les styles globaux,
 * et affiche le Header et le Footer autour du contenu de chaque page
 * (masqués sur desktop pour la messagerie).
 * @param children - le contenu de la page en cours à afficher dans le layout
 * @returns la structure HTML globale de l'application
 */
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
