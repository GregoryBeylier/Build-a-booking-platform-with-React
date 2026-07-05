import { fetchProperties } from "@/lib/api";

export default async function Home() {
  const logement = await fetchProperties();

  console.log(logement);

  return <div>Salut</div>;
}
