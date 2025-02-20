"use client";

import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";

interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: IconType;
  error?: string;
  isPassword?: boolean;
  label?: string;
  showPasswords?: boolean;
  onTogglePassword?: () => void;
  autoComplete?: "name" | "email" | "new-password" | "current-password" | "off";
}

export const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  isPassword,
  label,
  showPasswords,
  onTogglePassword,
  autoComplete,
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-800 text-sm font-semibold mb-2.5 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors duration-200" />
        </div>
        <input
          type={isPassword ? (showPasswords ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full pl-11 pr-4 py-3.5 bg-white border-2 rounded-xl
            ${error ? "border-red-500" : "border-gray-200"}
            text-gray-800 placeholder-gray-400
            focus:outline-none focus:ring-4 
            ${error ? "focus:ring-red-500/20" : "focus:ring-amber-500/20"}
            focus:border-amber-500
            group-hover:border-amber-500/50
            transition-all duration-200
            ${isPassword ? "pr-12" : "pr-4"}
            text-sm font-medium
          `}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />

        {isPassword && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
              hover:text-amber-500 transition-colors p-2 rounded-lg
              focus:outline-none focus:text-amber-500
              hover:bg-amber-50"
          >
            {showPasswords ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-red-500 text-sm font-medium flex items-center"
        >
          <span className="mr-1.5">●</span>
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  );
};
