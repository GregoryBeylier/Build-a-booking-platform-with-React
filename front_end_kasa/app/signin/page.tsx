import SignInForm from "@/components/auth/SignInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.",
};

/**
 * Page Connexion : permet à l'utilisateur de se connecter à son compte.
 *
 * @returns Le formulaire de connexion.
 */
export default function SignIn() {
  return <SignInForm />;
}
