"use client";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    Cookie.remove("token");
    router.push("/SignIn");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="translate-y-[-3px]">
      <LogOut size={17} className="text-[#99331A]" />
    </button>
  );
}
