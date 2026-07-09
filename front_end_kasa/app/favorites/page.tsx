"use client";

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { fetchFavorites } from "@/lib/api";
import type { Property } from "@/lib/api";
import PropertyCard from "@/components/property/PropertyCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const id = Cookie.get("userId");
      if (!id) {
        setIsLoading(false);
        return;
      }
      const result = await fetchFavorites(id);
      setFavorites(result);
      setIsLoading(false);
    };
    loadFavorites();
  }, []);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto mt-[51px]">
      <div className="text-center">
        <h1 className="font-bold text-[32px] leading-[143%] text-[#99331A]">
          Vos favoris
        </h1>
        <p className="font-normal text-sm leading-[143%] text-black max-w-[450] mx-auto">
          Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver
          ? Un simple clic et votre prochain séjour est en route.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <PropertyCard
            key={favorite.id}
            property={favorite}
            initialFavorite={true}
            onRemoveFavorite={() =>
              setFavorites((prev) => prev.filter((p) => p.id !== favorite.id))
            }
          />
        ))}
      </div>
    </div>
  );
}
