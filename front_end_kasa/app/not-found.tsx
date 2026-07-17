import Link from "next/link";

/**
 * Page 404 : affichée lorsque la page demandée n'existe pas.
 *
 * @returns Le message d'erreur 404 avec des liens de retour vers l'accueil.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 min-h-[70vh] px-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-black text-[100px] leading-[143%] text-[#99331A]">
          404
        </h1>
        <p className="max-w-[342px] mx-auto text-sm font-normal leading-[143%] text-black">
          Il semble que la page que vous cherchez ait pris des vacances… ou
          n’ait jamais existé.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/"
          className="w-[200px] py-2 px-8 rounded-[10px] bg-[#99331A] text-white text-center"
        >
          Accueil
        </Link>
        <Link
          href="/"
          className="w-[200px] py-2 px-8 rounded-[10px] bg-[#99331A] text-white text-center"
        >
          Logements
        </Link>
      </div>
    </div>
  );
}
