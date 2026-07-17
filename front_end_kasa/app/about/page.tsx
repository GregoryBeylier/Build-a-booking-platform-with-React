import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos - Kasa",
  description:
    "Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.  Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.",
};

/**
 * Page À propos : présente Kasa, sa mission et ses valeurs.
 *
 * @returns La page À propos avec les textes de présentation,
 * les images d'illustration et la liste des missions.
 */
export default function About() {
  return (
    <div className="max-w-7xl mx-auto mb-[120px] md:mb-[40px] mt-15 md:mt-0">
      <h1 className="font-bold text-[32px] leading-[143%] text-center text-[#99331A]">
        À propos
      </h1>
      <div className="flex flex-col gap-4">
        <p className="font-normal text-sm leading-[143%] text-center text-black">
          Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se
          sentir bien.
        </p>
        <p className="font-normal text-sm leading-[143%] text-center text-black">
          Depuis notre création, nous mettons en relation des voyageurs en quête
          d’authenticité avec des hôtes passionnés qui aiment partager leur
          région et leurs bonnes adresses.
        </p>
      </div>
      <div className="relative aspect-[342/458] md:aspect-[1115/458] rounded-[20px] overflow-hidden w-full mt-[40px]">
        <Image
          src="/pictureAbout.png"
          alt="Maison moderne en bois entourée d'abres', sous un couché de soleil"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mt-[40px]">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-lg leading-[143%] text-[#99331A]">
            Notre mission est simple :
          </h2>
          <div className="flex flex-col gap-6 font-normal text-sm leading-[143%] text-black">
            <p>1. Offrir une plateforme fiable et simple d'utilisation</p>
            <p>2. Proposer des hébergements variés et de qualité</p>
            <p>
              3.Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </p>
          </div>
          {/* Version desktop : regroupée avec le texte */}
          <p className="hidden md:block font-medium text-lg leading-[143%] text-[#99331A]">
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </p>
        </div>

        <div className="relative aspect-[358/458] md:aspect-[494/458] rounded-[20px] overflow-hidden w-full">
          <Image
            src="/aboutPicture.png"
            alt="chalet en bois, sous un couché de soleil"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Version mobile : entre le bloc texte et l'image, cachée dès md */}
      <p className="block md:hidden font-medium text-lg leading-[143%] text-[#99331A] mt-4">
        Que vous cherchiez un appartement cosy en centre-ville, une maison en
        bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que
        chaque séjour devienne un souvenir inoubliable.
      </p>
    </div>
  );
}
