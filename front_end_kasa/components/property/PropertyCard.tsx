import type { Property } from "@/lib/api";
import { Heart } from "lucide-react";
import Image from "next/image";

export interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div>
      <div className="relative aspect-[355/376] rounded-t-[10px] w-full overflow-hidden">
        <Image
          src={property.cover ?? "/cover-annonce-immobilier-defaut.svg"}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className=" flex items-center absolute bg-[#F5F5F5] top-4 right-4 w-8 h-8 rounded-[5px] justify-center ">
          <button aria-label="Ajouter aux favoris">
            <Heart size={14} fill="#565656" />
          </button>
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
        <p className="/* TODO: classes du prix, à récupérer depuis Figma */">
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
