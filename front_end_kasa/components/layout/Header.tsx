import Logo from "@/components/ui/Logo";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <div className="md:bg-[#FFFBF9]">
      <div className="md:flex  md:justify-center items-center bg-white mt-10 mb-10 rounded-[10px] max-w-[782px] mx-auto w-full py-2 px-[100px] shadow whitespace-nowrap">
        <div className="md:hidden">
          <MobileMenu />
        </div>
        <div className="hidden md:flex gap-5 mr-[50px]">
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
        </div>
        <Logo />
        <div className="hidden md:flex gap-5 ml-[30px]">
          <Link href="/add-property" className="text-[#99331A]">
            {" "}
            + Ajouter un logement{" "}
          </Link>
          <div className="flex gap-3 translate-y-[2px] ">
            <Link href="/favorites">
              <Heart size={17} className="text-[#99331A]" />
            </Link>
            <span className="w-[1px] h-4 bg-[#99331A]" />
            <Link href="/messages">
              <MessageSquare size={17} className="text-[#99331A]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
