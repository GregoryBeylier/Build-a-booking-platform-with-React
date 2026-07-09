"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { fetchLogin } from "@/lib/api";
import * as z from "zod";
import FormField from "@/components/ui/FormField";

const schema = z.object({
  email: z.string().min(1, "Email requis").email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type Input = z.infer<typeof schema>;

export default function SignIn() {
  // useForm gère la validation, les valeurs des champs et les erreurs du formulaire
  const {
    register,
    handleSubmit,
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
    const result = await fetchLogin(data);
    Cookies.set("token", result.token);
    Cookies.set("userId", result.user.id.toString());
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col max-w-[742px] w-full mx-auto rounded-[10px] border border-[#F5F5F5] py-8 px-4 md:p-[80px] gap-[38px] bg-white mt-[135px] mb-[135px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[38px]"
      >
        <div className="flex flex-col ">
          <h1 className="text-center text-[24px] md:text-[32px] font-bold text-[#99331A]">
            Heureux de vous revoir
          </h1>
          <p className="gap-[8px] md:gap-0 text-center text-sm font-normal text-black max-w-[390px] mx-auto">
            Connectez-vous pour retrouver vos réservations, vos annonces et tout
            ce qui rend vos séjours uniques.
          </p>
        </div>

        <div className="flex flex-col gap-[38px] max-w-[360px] w-full mx-auto">
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
        </div>

        <button
          className="w-[230px] h-[48px] rounded-[10px] py-3 px-8 bg-[#99331A] text-white mx-auto"
          type="submit"
        >
          Se connecter
        </button>

        <div className="flex flex-col gap-3 items-center">
          <a href="#" className="text-[#99331A] text-sm text-center ">
            Mot de passe oublié?
          </a>

          <span className="text-sm text-center px-4 text-[#99331A]">
            Pas encore de compte ?{" "}
            <a href="/register" className="text-[#99331A]">
              Créer un compte
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
