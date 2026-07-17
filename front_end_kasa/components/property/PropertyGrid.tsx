"use client";

import { fetchFavorites, Property } from "@/lib/api";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import PropertyCard from "./PropertyCard";

export interface PropertyGridProps {
  properties: Property[];
}

/**
 * Grille des logements de la page d'accueil : charge les favoris de
 * l'utilisateur connecté pour marquer les cartes correspondantes.
 * @param properties - la liste des logements à afficher
 * @returns la grille de cartes de logements
 */
export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const id = Cookie.get("userId");
      if (!id) return;
      const result = await fetchFavorites(id);
      setFavoriteIds(result.map((property) => property.id));
    };
    loadFavorites();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          initialFavorite={favoriteIds.includes(property.id)}
        />
      ))}
    </div>
  );
}
