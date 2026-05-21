import { AlertCircle } from "lucide-react";
import type { Fields } from "../utils/helperFuntions";

export const InputField: React.FC<{
  icon: React.ReactNode;
  name: keyof Fields;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon, name, type = "text", placeholder, value, error, onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={name}
        className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all
          placeholder:text-slate-300
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
              : "border-slate-200 focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 bg-white"
          }`}
      />
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-[11.5px] text-red-500 pl-1">
        <AlertCircle size={11} className="shrink-0" />
        {error}
      </p>
    )}
  </div>
);
