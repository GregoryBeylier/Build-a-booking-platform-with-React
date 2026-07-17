import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface BackButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Affiche un bouton retour, utilisable comme lien de navigation (via `href`)
 * ou comme bouton d'action (via `onClick`), par exemple pour revenir à la
 * liste des conversations sans changer d'URL sur mobile.
 * @param label - texte affiché à côté de la flèche
 * @param href - destination du lien, si le bouton doit naviguer vers une page
 * @param onClick - action exécutée au clic, si le bouton ne navigue pas
 * @returns le bouton retour, sous forme de lien ou de bouton selon le cas
 */
export default function BackButton({ label, href, onClick }: BackButtonProps) {
  const className =
    "inline-flex gap-[10px] items-center bg-[#F5F5F5] rounded-[10px] py-2 px-4 font-medium text-sm leading-[143%] text-[#565656]";

  if (href) {
    return (
      <Link href={href} className={className}>
        <ArrowLeft size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
