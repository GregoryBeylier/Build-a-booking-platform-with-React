import type { Property } from "@/lib/api";
import UploadedImage from "@/components/ui/UploadedImage";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export interface PropertyCardProps {
  property: Property;
  initialFavorite?: boolean;
  onRemoveFavorite?: () => void;
}

export default function PropertyCard({
  property,
  initialFavorite,
  onRemoveFavorite,
}: PropertyCardProps) {
  return (
    <div className="relative">
      <Link
        href={`/properties/${property.id}`}
        aria-label={property.title}
        className="absolute inset-0 z-0"
      />

      <div className="relative aspect-[355/376] rounded-t-[10px] w-full overflow-hidden">
        <UploadedImage
          src={property.cover ?? "/cover-annonce-immobilier-defaut.svg"}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div className="flex items-center absolute bg-[#F5F5F5] top-4 right-4 w-8 h-8 rounded-[5px] justify-center z-10">
          <FavoriteButton
            propertyId={property.id}
            initialFavorite={initialFavorite}
            onRemove={onRemoveFavorite}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between w-full h-[176px] rounded-b-[10px] bg-white pt-4 px-6 pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium leading-[143%] text-[#0D0D0D]">
            {property.title}
          </h2>
          <p className="text-sm font-normal leading-[143%] text-[#565656] ">
            {property.location}
          </p>
        </div>
        <p>
          {property.price_per_night} €
          <span className="text-sm font-normal leading-[143%] text-[#565656]">
            {" "}
            par nuit
          </span>
        </p>
      </div>
    </div>
  );
}
