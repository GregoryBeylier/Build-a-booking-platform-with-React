"use client";
import FormField from "@/components/ui/FormField";
import { CreatePropertyPayload, fetchAddProperty } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, "un titre est requis"),
  description: z.string().optional(),
  price_per_night: z.coerce.number().positive(),
  location: z.string().min(1, "la localisation est requise"),
  postalCode: z.string().optional(),
  equipments: z.array(z.string()).optional(),
});

type Input = z.infer<typeof schema>;

const equipmentsList = [
  "Micro-Ondes",
  "Douche italienne",
  "Frigo",
  "WIFI",
  "Parking",
  "Sèche Cheveux",
  "Machine à laver",
  "Cuisine équipée",
  "Télévision",
  "Chambre Séparée",
  "Climatisation",
  "Frigo Américain",
  "Clic-clac",
  "Four",
  "Rangements",
  "Lit",
  "Bouilloire",
  "SDB",
  "Toilettes sèches",
  "Cintres",
  "Baie vitrée",
  "Hotte",
  "Baignoire",
  "Vue Parc",
];

const tagList = [
  "Parc",
  "Night Life",
  "Culture",
  "Nature",
  "Touristique",
  "Vue sur mer",
  "Pour les couples",
  "Famille",
  "Forêt",
];

export default function AddProperty() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (clickedTag: string) => {
    if (selectedTags.includes(clickedTag)) {
      setSelectedTags(selectedTags.filter((t) => t !== clickedTag));
    } else {
      setSelectedTags([...selectedTags, clickedTag]);
    }
  };

  // useForm gère la validation, les valeurs des champs et les erreurs du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    // Valide le champ lors du blur
    mode: "onTouched",
  });

  // useRouter permet de naviguer entre les pages
  const router = useRouter();

  const onSubmit = async (data: Input) => {
    const newProperty: CreatePropertyPayload = {
      title: data.title,
      description: data.description,
      price_per_night: data.price_per_night,
      location: `${data.location} ${data.postalCode}`,
    };
    const result = await fetchAddProperty(newProperty);
    router.push(`/properties/${result.id}`);
    router.refresh();
  };

  return (
    <div className="flex flex-col max-w-[742px] w-full mx-auto rounded-[10px] border border-[#F5F5F5] py-8 px-4 md:p-[80px] gap-[38px] bg-white mt-[135px] mb-[135px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[38px]"
      >
        <div className="flex flex-col gap-[38px] max-w-[360px] w-full mx-auto">
          <FormField
            label="titre de la propriété"
            id="title"
            type="text"
            registration={register("title")}
            error={errors.title?.message}
          />

          <FormField
            label="description"
            id="description"
            type="text"
            registration={register("description")}
          />

          <FormField
            label="Code postal"
            id="postalCode"
            type="text"
            registration={register("postalCode")}
          />

          <FormField
            label="localisation"
            id="location"
            type="text"
            registration={register("location")}
            error={errors.location?.message}
          />

          <FormField
            label="Prix par nuits"
            id="price_per_night"
            type="text"
            registration={register("price_per_night")}
            error={errors.price_per_night?.message}
          />
        </div>

        <div>
          <h2>Équipements</h2>
          <div>
            {equipmentsList.map((equipment, index) => (
              <label>
                <input
                  type="checkbox"
                  key={index}
                  value={equipment}
                  {...register("equipments")}
                />
                {equipment}
              </label>
            ))}
          </div>
        </div>

        <div>
          Catégories
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`py-2 px-4 rounded-[5px] text-xs font-normal ${
                  selectedTags.includes(tag)
                    ? "bg-[#99331A] text-white"
                    : "bg-[#F5F5F5] text-[#565656]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          className="w-[230px] h-[48px] rounded-[10px] py-3 px-8 bg-[#99331A] text-white mx-auto"
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
