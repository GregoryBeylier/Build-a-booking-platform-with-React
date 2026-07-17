"use client";

import { useEffect, useState } from "react";
import { fetchAddFavorite, fetchRemoveFavorite } from "@/lib/api";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export interface FavoriteButtonProps {
  propertyId: string;
  initialFavorite?: boolean;
  onRemove?: () => void;
}

export default function FavoriteButton({
  propertyId,
  initialFavorite,
  onRemove,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite ?? false);
  const router = useRouter();

  useEffect(() => {
    setIsFavorite(initialFavorite ?? false);
  }, [initialFavorite]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    const token = Cookie.get("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    if (isFavorite) {
      await fetchRemoveFavorite(propertyId);
      setIsFavorite(false);
      onRemove?.();
      router.refresh();
    } else {
      await fetchAddFavorite(propertyId);
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      aria-label="Ajouter aux favoris"
      className={
        isFavorite
          ? "flex items-center justify-center w-8 h-8 rounded-[5px] bg-[#99331A]"
          : "flex items-center justify-center w-8 h-8 rounded-[5px] bg-[#F5F5F5]"
      }
    >
      <Heart
        size={17}
        className={isFavorite ? "text-[#FFFFFF]" : "text-[#FFFFFF]"}
        fill={isFavorite ? "#E0C1BA" : "#868686"}
      />
    </button>
  );
}
