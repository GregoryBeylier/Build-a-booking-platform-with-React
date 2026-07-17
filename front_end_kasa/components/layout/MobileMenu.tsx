"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/ui/Logo";

/**
 * Menu de navigation mobile : bouton burger qui ouvre un panneau plein
 * écran avec les liens du site, refermable au clic ou avec la touche Échap.
 * @returns le bouton burger et son menu plein écran
 */
export default function MobileMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  // Ferme le menu avec la touche Échap
  useEffect(() => {
    if (!openMenu) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  return (
    <>
      <button
        onClick={() => setOpenMenu(!openMenu)}
        aria-label="Menu déroulant"
        aria-expanded={openMenu}
        aria-haspopup="true"
      >
        <div className="relative w-[46px] h-[46px]">
          <Image src="/Menu.svg" alt="Menu" fill />
        </div>
      </button>

      {openMenu && (
        <div className="fixed inset-0 z-50 bg-white px-4 pt-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo />
            <button
              onClick={() => setOpenMenu(false)}
              aria-label="Fermer le menu"
            >
              <X size={28} />
            </button>
          </div>

          <Link
            href="/"
            className="block py-4 border-b border-[#F5F5F5] text-lg"
            onClick={() => setOpenMenu(false)}
          >
            Accueil
          </Link>
          <Link
            href="/about"
            className="block py-4 border-b border-[#F5F5F5] text-lg"
            onClick={() => setOpenMenu(false)}
          >
            À propos
          </Link>
          <Link
            href="/messages"
            className="block py-4 border-b border-[#F5F5F5] text-lg"
            onClick={() => setOpenMenu(false)}
          >
            Messagerie
          </Link>
          <Link
            href="/favorites"
            className="block py-4 border-b border-[#F5F5F5] text-lg"
            onClick={() => setOpenMenu(false)}
          >
            Favoris
          </Link>
          <Link
            href="/add-property"
            className="block mt-4 bg-[#99331A] text-white w-fit rounded-[10px] py-2 px-8"
            onClick={() => setOpenMenu(false)}
          >
            Ajouter un logement
          </Link>
        </div>
      )}
    </>
  );
}
