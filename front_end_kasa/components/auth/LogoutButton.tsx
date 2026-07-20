"use client";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import type { ReactNode } from "react";

interface LogoutButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * Bouton de déconnexion : supprime le token et l'identifiant utilisateur
 * des cookies puis redirige vers la page de connexion.
 * @param props.children - le contenu affiché dans le bouton (icône ou texte)
 * @param props.className - les classes CSS à appliquer, selon le contexte d'utilisation
 * @returns le bouton de déconnexion
 */
export default function LogoutButton({
  children,
  className,
}: LogoutButtonProps) {
  const router = useRouter();
  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/signin");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}
