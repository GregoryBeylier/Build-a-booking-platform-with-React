import type { Property } from "@/lib/api";
import { Heart } from "lucide-react";
import Image from "next/image";

export interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div>
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={property.cover ?? "/cover-annonce-immobilier-defaut.svg"}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>
      <h2>{property.title}</h2>
      <p>{property.location}</p>
      <p>{property.price_per_night}</p>
      <button aria-label="Ajouter aux favoris">
        <Heart size={17} />
      </button>
    </div>
  );
}
