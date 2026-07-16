import SignInForm from "@/components/auth/SignInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.",
};

export default function SignIn() {
  return <SignInForm />;
}
