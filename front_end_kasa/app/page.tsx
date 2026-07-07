import PropertyCard from "@/components/property/PropertyCard";
import { fetchProperties } from "@/lib/api";

export default async function Home() {
  const logements = await fetchProperties();

  return (
    <>
      {logements.map((logement) => (
        <PropertyCard key={logement.id} property={logement} />
      ))}
    </>
  );
}
