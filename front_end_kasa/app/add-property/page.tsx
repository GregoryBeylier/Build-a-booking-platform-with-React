"use client";
import FormField from "@/components/ui/FormField";
import {
  CreatePropertyPayload,
  fetchAddProperty,
  fetchUploadImage,
  fetchUser,
  UserProfile,
} from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, "un titre est requis"),
  description: z.string().optional(),
  price_per_night: z.coerce.number().positive(),
  location: z.string().min(1, "la localisation est requise"),
  postalCode: z.string().optional(),
  equipments: z.array(z.string()).optional(),
  cover: z.string().optional(),
  pictures: z.array(z.string()).optional(),
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
    setValue,
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

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await fetchUploadImage({ file, purpose: "property-cover" });
    setValue("cover", url);
  }

  async function handlePicturesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const files = [...e.target.files];
    const urls: string[] = [];

    for (const file of files) {
      const url = await fetchUploadImage({ file, purpose: "pictures" });
      urls.push(url);
    }

    setValue("pictures", urls);
  }

  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const id = Cookie.get("userId");
      if (!id) {
        return;
      }
      const result = await fetchUser(id);
      setUser(result);
    };
    loadUser();
  }, []);

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
            {equipmentsList.map((equipment) => (
              <label key={equipment}>
                <input
                  type="checkbox"
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

            <div className="flex flex-col gap-1">
              <label
                className="text-sm font-medium text-[#0D0D0D]"
                htmlFor="customCategory"
              >
                Ajouter une catégorie personnalisée
              </label>
              <input
                className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5"
                id="customCategory"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium text-[#0D0D0D]"
              htmlFor="uploadCover"
            >
              Image de couverture
            </label>
            <input
              className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5"
              id="uploadCover"
              type="file"
              onChange={handleCoverUpload}
            />

            <label
              className="text-sm font-medium text-[#0D0D0D]"
              htmlFor="uploadPicture"
            >
              Image du logement
            </label>
            <input
              multiple
              className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5"
              id="uploadPicture"
              type="file"
              onChange={handlePicturesUpload}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Nom de l'hôte</label>
            <input value={user?.name ?? ""} readOnly />
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
