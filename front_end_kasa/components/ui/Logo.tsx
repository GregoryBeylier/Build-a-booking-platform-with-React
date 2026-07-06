import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="relative w-24 h-8 hidden md:block">
        <Image src="/Logodesktop.svg" alt="Kasa" fill />
      </div>
      <div className="relative w-24 h-8 block md:hidden">
        <Image src="/Logomobile.svg" alt="Kasa" fill />
      </div>
    </div>
  );
}
