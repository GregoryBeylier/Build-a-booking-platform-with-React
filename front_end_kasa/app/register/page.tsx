"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import * as z from "zod";
import { fetchRegister } from "@/lib/api";
import FormField from "@/components/ui/FormField";

// Schéma de validation Zod du formulaire d'inscription
const schema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.email("Adresse email incorecte"),
  acceptTerms: z.boolean().refine((valeur) => valeur === true, {
    message: "Vous devez accepter les conditions d’utilisation pour continuer.",
  }),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Au moins une lettre majuscule")
    .regex(/[a-z]/, "Au moins une lettre minuscule")
    .regex(/[0-9]/, "Au moins un chiffre")
    .regex(/[@$!%*?&]/, "Au moins un caractère spécial"),
});

type Input = z.infer<typeof schema>;

export default function Register() {
  // useForm gère la validation, les valeurs des champs et les erreurs du formulaire
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
    // Valide le champ lors du blur
    mode: "onTouched",
  });

  // useRouter permet de naviguer entre les pages
  const router = useRouter();

  // Cookie permet de stocker le token dans le navigateur
  const Cookies = Cookie.withAttributes({ path: "/" });

  // onSubmit envoie les données du formulaire à l'API
  const onSubmit = async (data: Input) => {
    const name = `${data.firstName} ${data.lastName}`;
    const result = await fetchRegister({
      name,
      email: data.email,
      password: data.password,
    });
    Cookies.set("token", result.token);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col max-w-[742px] w-full mx-auto rounded-[10px] border border-[#F5F5F5] py-8 px-4 md:p-[80px] gap-[38px] bg-white mt-10 mb-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[38px]"
      >
        <div className="flex flex-col">
          <h1 className="text-center text-[24px] md:text-[32px] font-bold text-[#99331A]">
            Rejoignez la communauté Kasa
          </h1>
          <p className="gap-[8px] md:gap-0 text-center text-sm font-normal text-black max-w-[470px] mx-auto ">
            Créez votre compte et commencez à voyager autrement : réservez des
            logements uniques, découvrez de nouvelles destinations et partagez
            vos propres lieux avec d’autres voyageurs.
          </p>
        </div>

        <div className="flex flex-col gap-[38px] max-w-[360px] w-full mx-auto">
          <FormField
            label="Prénom"
            id="firstName"
            type="text"
            registration={register("firstName")}
            error={errors.firstName?.message}
          />

          <FormField
            label="Nom"
            id="lastName"
            type="text"
            registration={register("lastName")}
            error={errors.lastName?.message}
          />

          <FormField
            label="Adresse email"
            id="email"
            type="email"
            registration={register("email")}
            error={errors.email?.message}
          />

          <FormField
            label="Mot de passe"
            id="password"
            type="password"
            registration={register("password")}
            error={errors.password?.message}
          />

          <div className="flex gap-3">
            <input
              type="checkbox"
              className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[#99331A] checked:border-[#99331A] cursor-pointer"
              id="acceptTerms"
              {...register("acceptTerms")}
            />
            <label htmlFor="acceptTerms" className="text-xs font-normal">
              J'accepte les{" "}
              <a href="#" className="underline ">
                conditions générales d'utilisation
              </a>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-600 text-xs">{errors.acceptTerms.message}</p>
          )}
        </div>

        <button
          className="w-[230px] h-[48px] rounded-[10px] py-3 px-8 bg-[#99331A] text-white mx-auto"
          type="submit"
        >
          S’inscrire
        </button>

        <div className="flex flex-col gap-3 items-center">
          <span className="text-sm text-center px-4 text-[#99331A]">
            Déjà membre ?{" "}
            <a href="/signIn" className="text-[#99331A]">
              Se connecter
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
