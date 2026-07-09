import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id: string;
  type: "email" | "password" | "text";
  error?: string;
  registration: UseFormRegisterReturn;
}

export default function FormField({
  label,
  id,
  type,
  error,
  registration,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#0D0D0D]" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full h-[40px] rounded-[4px] border border-[#F5F5F5] bg-white px-2.5"
        id={id}
        type={type}
        {...registration}
      />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
