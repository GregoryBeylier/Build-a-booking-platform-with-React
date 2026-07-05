import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="relative w-24 h-8">
        <Image
          src="/Logodesktop.svg"
          alt="Kasa"
          fill
          className="hidden md:block"
        />
      </div>
      <div className="relative w-24 h-8">
        <Image
          src="/Logomobile.svg"
          alt="Kasa"
          fill
          className="block md:hidden"
        />
      </div>
    </div>
  );
}
