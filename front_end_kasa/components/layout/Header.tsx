import Logo from "@/components/ui/Logo";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";
import { cookies } from "next/headers";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return (
    <div className="md:bg-[#FFFBF9]">
      <div className="bg-white px-4 py-3 md:mt-10 md:mb-10 md:rounded-[10px] md:max-w-[782px] md:mx-auto md:w-full md:py-2 md:px-[100px] md:shadow whitespace-nowrap h-[85px] md:h-auto">
        {/* Mobile uniquement : Logo + burger côte à côte */}
        <div className="flex md:hidden justify-between items-center">
          <Logo />
          <MobileMenu />
        </div>

        {/* Desktop uniquement : nav gauche, Logo, nav droite centrés */}
        <div className="hidden md:flex md:justify-center items-center  ">
          <div className="flex gap-5 mr-[50px]">
            <Link href="/">Accueil</Link>
            <Link href="/about">À propos</Link>
          </div>
          <Logo />
          <div className="flex gap-5 ml-[30px]">
            <Link href="/add-property" className="text-[#99331A]">
              {" "}
              + Ajouter un logement{" "}
            </Link>
            <div className="flex gap-3 translate-y-[2px]">
              <Link aria-label="Voir mes favoris" href="/favorites">
                <Heart size={17} className="text-[#99331A] translate-y-[1px]" />
              </Link>
              <span className="w-[1px] h-4 bg-[#99331A]" />
              <Link aria-label="Voir mes messages" href="/messages">
                <MessageSquare
                  size={17}
                  className="text-[#99331A] translate-y-[1px]"
                />
              </Link>
              <span className="w-[1px] h-4 bg-[#99331A]" />
              {token && <LogoutButton />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
