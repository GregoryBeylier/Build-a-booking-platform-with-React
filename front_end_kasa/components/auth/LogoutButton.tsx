"use client";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { LogOut } from "lucide-react";

/**
 * Bouton de déconnexion : supprime le token et l'identifiant utilisateur
 * des cookies puis redirige vers la page de connexion.
 * @returns le bouton de déconnexion
 */
export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/signin");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="translate-y-[-3px]">
      <LogOut aria-label="Déconnexion" size={17} className="text-[#99331A]" />
    </button>
  );
}
