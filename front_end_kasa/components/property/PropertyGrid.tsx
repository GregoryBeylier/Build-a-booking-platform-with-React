"use client";

import { fetchFavorites, Property } from "@/lib/api";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import PropertyCard from "./PropertyCard";

export interface PropertyGridProps {
  properties: Property[];
}

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
