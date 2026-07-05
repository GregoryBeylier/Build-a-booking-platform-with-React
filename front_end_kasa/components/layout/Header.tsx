import Logo from "@/components/ui/Logo";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white">
      <Logo />
      <div className="md:hidden">
        <MobileMenu />
      </div>
      <div className="hidden md:flex">
        <Link href="/">Accueil</Link>
        <Link href="/about">A propos</Link>
        <Link href="/add-property">Ajouter un logement </Link>
        <Link href="/messages">
          <MessageSquare />
        </Link>
        <Link href="/favorites">
          <Heart />
        </Link>
      </div>
    </div>
  );
}
