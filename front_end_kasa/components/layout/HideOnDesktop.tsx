"use client";

import { usePathname } from "next/navigation";

/**
 * Enveloppe un contenu et le masque sur desktop lorsque l'URL actuelle
 * commence par un des chemins fournis (ex : cacher le Header et le Footer
 * sur la messagerie).
 * @param children - le contenu à afficher ou masquer
 * @param paths - les débuts d'URL pour lesquels le contenu doit être masqué sur desktop
 * @returns le contenu, masqué ou non selon la page courante
 */
export default function HideOnDesktop({
  children,
  paths,
}: {
  children: React.ReactNode;
  paths: string[];
}) {
  const pathname = usePathname();

  // true si l'URL actuelle commence par un des chemins reçus en prop
  const shouldHide = paths.some((path) => pathname.startsWith(path));

  return (
    <div className={shouldHide ? "md:hidden" : "md:bg-[#FFFBF9]"}>
      {children}
    </div>
  );
}
