import PropertyCard from "@/components/property/PropertyCard";
import { fetchProperties } from "@/lib/api";

export default async function Home() {
  const logements = await fetchProperties();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {logements.map((logement) => (
        <PropertyCard key={logement.id} property={logement} />
      ))}
    </div>
  );
}
