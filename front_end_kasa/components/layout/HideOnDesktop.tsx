"use client";

import { usePathname } from "next/navigation";

export default function HideOnDesktop({
  children,
  paths,
}: {
  children: React.ReactNode;
  paths: string[];
}) {
  const pathname = usePathname();

  // true si l'URL actuelle commence par un des chemins reçus en prop
  const shouldHide = paths.some((path) => pathname.startsWith(path));

  return <div className={shouldHide ? "md:hidden" : ""}>{children}</div>;
}
