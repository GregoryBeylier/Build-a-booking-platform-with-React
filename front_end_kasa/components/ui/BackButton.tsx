import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface BackButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function BackButton({ label, href, onClick }: BackButtonProps) {
  const className =
    "inline-flex gap-[10px] items-center bg-[#F5F5F5] rounded-[10px] py-2 px-4 font-medium text-sm leading-[143%] text-[#565656]";

  if (href) {
    return (
      <Link href={href} className={className}>
        <ArrowLeft size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
