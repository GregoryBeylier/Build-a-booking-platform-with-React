import PropertyGrid from "@/components/property/PropertyGrid";
import StepCard from "@/components/step/StepCard";
import type { StepProps } from "@/components/step/StepCard";
import { fetchProperties } from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kasa - Location de logements entre particuliers",
  description:
    "Découvrez des logements uniques à louer partout en France et réservez votre prochain séjour en toute simplicité avec Kasa.",
};

const steps: StepProps[] = [
  {
    title: "Recherchez",
    description:
      "Entrez votre destination, vos dates et laissez Kasa faire le reste",
  },
  {
    title: "Réservez",
    description:
      "Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés",
  },
  {
    title: "Vivez l’expérience",
    description:
      "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout",
  },
];

export default async function Home() {
  const logements = await fetchProperties();

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto mt-[51px]">
      <div className="text-center">
        <h1 className="font-bold text-[32px] leading-[143%] text-[#99331A] ">
          Chez vous, partout et ailleurs
        </h1>
        <p className="font-normal text-sm leading-[143%] text-black">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </p>
      </div>
      <div className="relative aspect-[342/458] md:aspect-[1115/458] rounded-[20px] overflow-hidden w-full">
        <Image
          src="/Picture_home.svg"
          alt="Maison moderne en bois entourée de hautes herbes, sous un ciel nuageux"
          fill
          className="object-cover"
        />
      </div>
      <PropertyGrid properties={logements} />

      <div className="mb-10 bg-white w-full rounded-[10px] p-10 flex flex-col gap-10">
        <div>
          <h2 className="font-semibold text-2xl leading-[143%] text-center text-[#0D0D0D]">
            Comment ça marche ?
          </h2>
          <p className="font-normal text-sm leading-[143%] text-center text-black">
            Que vous partiez pour un week-end improvisé, des vacances en famille
            ou un voyage professionnel, Kasa vous aide à trouver un lieu qui
            vous ressemble.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center ">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
