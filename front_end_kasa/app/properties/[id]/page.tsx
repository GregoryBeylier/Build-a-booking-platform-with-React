import TagList from "@/components/property/TagList";
import BackButton from "@/components/ui/BackButton";
import UploadedImage from "@/components/ui/UploadedImage";
import { fetchPropertyById } from "@/lib/api";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// generateMetadata est une fonction spéciale reconnue par Next.js,
// exportée à côté du composant de page (pas dedans)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const details = await fetchPropertyById(id); // même fonction que dans la page

  return {
    title: `${details.title} - ${details.location}`,
    description: details.description,
  };
}

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const details = await fetchPropertyById(id);

  const smallPictures = details.pictures?.slice(1);

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="mb-[24px] mt-[18px] md:mt-[86px]">
        <BackButton label="Retour aux annonces" href="/" />
      </div>
      <div className="flex flex-col md:flex-row md:items-start gap-[20px] mt-[40px]">
        {/* colonne : galerie + carte description */}
        <div className="flex-1 flex flex-col gap-[20px] md:mb-[86px]">
          <div className="flex-col flex flex-1 gap-[10px] md:flex-row">
            <div className="relative aspect-[303/357] rounded-[10px] flex-1 overflow-hidden">
              <UploadedImage
                src={
                  details.pictures?.[0] ??
                  "/cover-annonce-immobilier-defaut.svg"
                }
                alt="Photo du logement"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 grid grid-cols-4 md:grid-cols-2 gap-[10px]">
              {smallPictures?.map((picture, index) => (
                <div
                  key={index}
                  className="relative aspect-[146.5/174] rounded-[10px] w-full overflow-hidden"
                >
                  <UploadedImage
                    src={picture}
                    alt="Photo du logement"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col bg-white border border-[#F5F5F5] rounded-[10px] p-[24px] gap-[40px]">
            <h1>{details.title}</h1>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <p>{details.location}</p>
            </div>
            <p>{details.description}</p>
            <div className="flex flex-col gap-4">
              <h2>Équipements</h2>
              <TagList items={details.equipments} />
            </div>
            <div className="flex flex-col gap-4">
              <h2>Catégorie</h2>
              <TagList items={details.tags} />
            </div>
          </div>
        </div>

        {/* Carte hôte */}
        <div className="w-full md:w-[360px] rounded-[10px] border border-[#F5F5F5] p-6 flex flex-col gap-[28px] bg-white mb-[86px] md:mb-0">
          <div>
            <p>Votre hôte</p>
          </div>
          <div className="flex items-center gap-[18px]">
            <div className="relative w-[82px] h-[82px] rounded-[10px] overflow-hidden">
              <UploadedImage
                src={details.host?.picture ?? "/avatar-defaut.svg"}
                alt="Photo de profil de l'hôte"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-[18px]">
              {details.host?.name}
              <div className="inline-flex items-center gap-1 rounded-[10px] bg-[#F5F5F5] p-2">
                <Star size={20} fill="#99331A" stroke="#99331A" />
                {details.rating_avg}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full py-2 px-8 rounded-[10px] bg-[#99331A] text-white">
              Contacter l'hôte
            </button>
            <Link
              href={`/messages?hostId=${details.host?.id}`}
              className="w-full py-2 px-8 rounded-[10px] bg-[#99331A] text-white text-center"
            >
              Envoyer un message
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
