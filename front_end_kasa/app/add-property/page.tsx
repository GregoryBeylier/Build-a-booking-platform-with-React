"use client";
import BackButton from "@/components/ui/BackButton";
import FormField from "@/components/ui/FormField";
import {
  CreatePropertyPayload,
  fetchAddProperty,
  fetchUpdateUser,
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

  async function handleUserPicture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!user) return;

    const url = await fetchUploadImage({ file, purpose: "user-picture" });
    const updatedUser = await fetchUpdateUser(user.id.toString(), {
      name: user.name,
      picture: url,
      role: user.role,
    });
    setUser(updatedUser);
  }

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: Input) => {
    const newProperty: CreatePropertyPayload = {
      title: data.title,
      description: data.description,
      price_per_night: data.price_per_night,
      location: `${data.location} ${data.postalCode}`,
      cover: data.cover,
      pictures: data.pictures,
      equipments: data.equipments,
      tags: selectedTags,
    };

    try {
      const result = await fetchAddProperty(newProperty);
      router.push(`/properties/${result.id}`);
      router.refresh();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto mt-[135px] mb-[135px] px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <BackButton label="Retour" href="/" />
          <div className="flex items-center justify-between mt-6">
            <h1 className="text-2xl font-bold">Ajouter une propriété</h1>
            <button
              type="submit"
              className="py-2 px-6 rounded-[10px] bg-[#99331A] text-white text-sm"
            >
              Ajouter
            </button>
          </div>
        </div>

        {submitError && (
          <p role="alert" className="text-red-600 text-center mb-4">
            {submitError}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Carte Infos */}
          <div className="bg-white border border-[#F5F5F5] rounded-[10px] p-[80px] flex flex-col gap-4 w-full md:w-[576px]">
            <FormField
              label="Titre de la propriété"
              id="title"
              type="text"
              placeholder="Ex : Appartement cosy au coeur de paris"
              registration={register("title")}
              error={errors.title?.message}
            />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="description"
                className="text-sm font-medium text-[#0D0D0D]"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Décrivez votre propriété en détail..."
                className="w-full h-[120px] rounded-[4px] border border-[#F5F5F5] bg-white p-2.5 placeholder:text-sm"
                {...register("description")}
              />
            </div>
            <FormField
              label="Code postal"
              id="postalCode"
              type="text"
              placeholder="Ex : 28100"
              registration={register("postalCode")}
            />
            <FormField
              label="Localisation"
              id="location"
              type="text"
              registration={register("location")}
              placeholder="Ex : Dreux"
              error={errors.location?.message}
            />
            <FormField
              label="Prix par nuits"
              id="price_per_night"
              type="text"
              registration={register("price_per_night")}
              placeholder="Ex : 110 €"
              error={errors.price_per_night?.message}
            />
          </div>

          {/* Colonne droite haute : Images + Hôte, empilées */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[#F5F5F5] rounded-[10px] p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-[#0D0D0D]"
                  htmlFor="uploadCover"
                >
                  Image de couverture
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5"
                    id="uploadCover"
                    type="file"
                    onChange={handleCoverUpload}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
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
            </div>

            <div className="bg-white border border-[#F5F5F5] rounded-[10px] p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-[#0D0D0D]"
                  htmlFor="host"
                >
                  Nom de l'hôte
                </label>
                <input
                  id="host"
                  className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5"
                  value={user?.name ?? ""}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-[#0D0D0D]"
                  htmlFor="userPicture"
                >
                  Photo de profil
                </label>
                <input
                  id="userPicture"
                  className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5"
                  onChange={handleUserPicture}
                  type="file"
                />
              </div>
            </div>
          </div>

          {/* Carte Équipements */}
          <div className="bg-white border border-[#F5F5F5] rounded-[10px] p-6">
            <h2 className="font-medium mb-4">Équipements</h2>
            <div className="grid grid-cols-2 gap-2">
              {equipmentsList.map((equipment) => (
                <label
                  key={equipment}
                  className="flex items-center gap-2 text-sm"
                >
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

          {/* Carte Catégories */}
          <div className="bg-white border border-[#F5F5F5] rounded-[10px] p-6">
            <h2 className="font-medium mb-4">Catégories</h2>
            <div className="flex flex-wrap gap-2 mb-4">
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
        </div>
      </form>
    </div>
  );
}
