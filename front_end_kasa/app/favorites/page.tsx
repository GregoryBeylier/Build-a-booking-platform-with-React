import { cookies } from "next/headers";
import PropertyCard from "@/components/property/PropertyCard";
import { fetchFavorites } from "@/lib/api";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vos favoris",
  description:
    "Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver ? Un simple clic et votre prochain séjour est en route.",
};

/**
 * Page Favoris : lit l'identifiant et le token de l'utilisateur dans les
 * cookies puis récupère et affiche ses logements favoris.
 *
 * @returns La grille des logements favoris, un message si la liste est vide,
 * ou rien si l'utilisateur n'est pas connecté.
 */
export default async function Favorites() {
  const cookieStore = await cookies();
  const id = cookieStore.get("userId")?.value;
  const token = cookieStore.get("token")?.value;

  if (!id || !token) {
    return null;
  }

  const favorites = await fetchFavorites(id, token);

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto mt-[51px]">
      <div className="text-center mb-[70px]">
        <h1 className="font-bold text-[32px] leading-[143%] text-[#99331A]">
          Vos favoris
        </h1>
        <p className="font-normal text-sm leading-[143%] text-black max-w-[500px] mx-auto">
          Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver
          ? Un simple clic et votre prochain séjour est en route.
        </p>
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-sm text-black">
          Vous n'avez pas encore de favoris.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[70px]">
          {favorites.map((favorite) => (
            <PropertyCard
              key={favorite.id}
              property={favorite}
              initialFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
