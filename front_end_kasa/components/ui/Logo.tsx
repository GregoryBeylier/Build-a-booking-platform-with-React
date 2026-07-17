import Image from "next/image";

/**
 * Logo Kasa : affiche la version desktop ou mobile selon la taille d'écran.
 * @returns le logo du site
 */
export default function Logo() {
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="relative w-24 h-8 hidden md:block">
        <Image src="/Logodesktop.png" alt="Kasa" fill />
      </div>
      <div className="relative w-[46px] h-[53px] block md:hidden">
        <Image src="/Logomobile.svg" alt="Kasa" fill />
      </div>
    </div>
  );
}
