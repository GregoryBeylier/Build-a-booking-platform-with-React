import Image from "next/image";

/**
 * Pied de page de l'application : affiche le logo Kasa et la mention
 * de copyright avec l'année en cours.
 * @returns le pied de page
 */
export default function Footer() {
  return (
    <div className="bg-white flex justify-between items-center h-[70px] py-2 px-[40px] border-t border-t-[#F5F5F5]">
      <div className="relative w-[46px] h-[53px]">
        <Image src="/Logomobile.svg" alt="Kasa" fill />
      </div>
      <p className="text-xs font-medium text-[#565656]">
        © {new Date().getFullYear()} Kasa. Tous droits réservés
      </p>
    </div>
  );
}
