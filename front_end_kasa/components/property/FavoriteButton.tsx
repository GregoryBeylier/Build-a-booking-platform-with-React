"use client";

import { useState } from "react";
import { fetchAddFavorite, fetchRemoveFavorite } from "@/lib/api";
import { Heart } from "lucide-react";

export interface FavoriteButtonProps {
  propertyId: string;
}

export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFavorite) {
      await fetchRemoveFavorite(propertyId);
      setIsFavorite(false);
    } else {
      await fetchAddFavorite(propertyId);
      setIsFavorite(true);
    }
  };

  return (
    <button onClick={handleToggleFavorite} aria-label="Ajouter aux favoris">
      <Heart
        size={17}
        className={isFavorite ? "text-[#99331A]" : "text-[#565656]"}
        fill={isFavorite ? "#99331A" : "none"}
      />
    </button>
  );
}
