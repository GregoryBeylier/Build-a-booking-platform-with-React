import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription",
  description:
    "Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.",
};

/**
 * Page Inscription : permet à l'utilisateur de créer un compte Kasa.
 *
 * @returns Le formulaire d'inscription.
 */
export default function Register() {
  return <RegisterForm />;
}
