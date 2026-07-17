import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id: string;
  type: "email" | "password" | "text";
  error?: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
}

/**
 * Champ de formulaire réutilisable (label + input + message d'erreur),
 * pensé pour être branché à react-hook-form via `register(...)`.
 * @param label - texte affiché au-dessus du champ
 * @param id - identifiant unique du champ, relie le label et l'input (accessibilité)
 * @param type - type natif de l'input HTML ("email", "password" ou "text")
 * @param error - message d'erreur de validation à afficher, s'il y en a un
 * @param registration - objet renvoyé par `register()` de react-hook-form
 * @param placeholder - texte indicatif affiché quand le champ est vide
 * @returns le champ de formulaire complet
 */
export default function FormField({
  label,
  id,
  type,
  error,
  registration,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#0D0D0D]" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5 placeholder:text-sm"
        id={id}
        type={type}
        {...registration}
        placeholder={placeholder}
      />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
