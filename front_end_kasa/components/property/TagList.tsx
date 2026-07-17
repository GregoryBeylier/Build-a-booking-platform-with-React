export interface TagListProps {
  items?: string[];
}

/**
 * Affiche une liste d'étiquettes (équipements, catégories...) sous forme
 * de pastilles, utilisée notamment sur la page de détail d'un logement.
 * @param items - la liste des textes à afficher, un par pastille (peut être vide ou absente)
 * @returns la liste des pastilles
 */
export default function TagList({ items }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items?.map((item, index) => (
        <span
          className="py-2 px-4 rounded-[5px] bg-[#F5F5F5] text-xs font-normal text-[#565656]"
          key={index}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
