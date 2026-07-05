import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-white flex justify-between items-center">
      <div className="relative w-8 h-8">
        <Image src="/Logomobile.svg" alt="Kasa" fill />
      </div>
      <p className="">
        © {new Date().getFullYear()} Kasa. Tous droits réservés
      </p>
    </div>
  );
}
