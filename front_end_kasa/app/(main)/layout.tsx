import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-[#FFFBF9] flex-1 px-4">{children}</main>
      <Footer />
    </>
  );
}
