import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface BackButtonProps {
  label: string;
  href: string;
}

export default function BackButton({ label, href }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex gap-[10px] items-center bg-[#F5F5F5] rounded-[10px] py-2 px-4 font-medium text-sm leading-[143%] text-[#565656]"
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  );
}
