import BackButton from "@/components/ui/BackButton";
import { fetchPropertyById } from "@/lib/api";
import { Star } from "lucide-react";
import Image from "next/image";

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
      <div className="mb-[24px] mt-[86px]">
        <BackButton label="Retour aux annonces" href="/" />
      </div>
      <div className="flex items-start gap-[20px]">
        <div className="flex flex-1 gap-[10px]">
          <div className="relative aspect-[303/357] rounded-[10px] flex-1 overflow-hidden">
            <Image
              src={
                details.pictures?.[0] ?? "/cover-annonce-immobilier-defaut.svg"
              }
              alt="Photo du logement"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-[10px]">
            {smallPictures?.map((picture, index) => (
              <div
                key={index}
                className="relative aspect-[146.5/174] rounded-[10px] w-full overflow-hidden"
              >
                <Image
                  src={picture}
                  alt="Photo du logement"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[360px] rounded-[10px] border border-[#F5F5F5] p-6 flex flex-col gap-[28px] bg-white">
          <div>
            <p>Votre hôte</p>
          </div>
          <div className="flex items-center gap-[18px]">
            <div className="relative w-[82px] h-[82px] rounded-[10px] overflow-hidden">
              <Image
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
            <button className="w-full py-2 px-8 rounded-[10px] bg-[#99331A] text-white">
              Envoyer un message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
