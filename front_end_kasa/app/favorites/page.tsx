import FavoritesClient from "@/components/favorite/FavoritesClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vos favoris",
  description:
    "Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver ? Un simple clic et votre prochain séjour est en route.",
};

export default function Favorites() {
  return <FavoritesClient />;
}
