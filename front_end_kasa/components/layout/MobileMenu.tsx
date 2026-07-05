"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          aria-label="Menu déroulant"
          aria-expanded={openMenu}
          aria-haspopup="true"
        >
          {openMenu ? <X /> : <Menu />}
        </button>
        {openMenu && (
          <div>
            <div>
              <Link href="/">Accueil</Link>
            </div>
            <div>
              <Link href="/about">A propos</Link>
            </div>
            <div>
              <Link href="/messages">Messagerie</Link>
            </div>
            <div>
              <Link href="/favorites">Favoris</Link>
            </div>
            <div>
              <Link href="/add-property">Ajouter un logement </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
