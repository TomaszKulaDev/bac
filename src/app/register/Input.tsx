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
    <div className="space-y-2.5">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-800 text-sm font-semibold tracking-wide pl-1">
            {label}
          </label>
          {isPassword && label === "Hasło" && onTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-amber-600 hover:text-amber-700 text-sm transition-all 
                flex items-center space-x-1.5 hover:bg-amber-50 px-3 py-1.5 rounded-lg
                border border-transparent hover:border-amber-300"
            >
              {showPasswords ? (
                <>
                  <FaEyeSlash className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Ukryj</span>
                </>
              ) : (
                <>
                  <FaEye className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Pokaż</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-500 group-hover:text-amber-600 transition-colors duration-200" />
        </div>
        <input
          type={isPassword ? (showPasswords ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-11 pr-4 py-3.5
            bg-white border-2 rounded-xl text-gray-800
            focus:outline-none focus:ring-4 focus:ring-amber-500/30 
            focus:border-amber-500 group-hover:border-amber-500
            placeholder-gray-500 transition-all duration-200
            ${
              error
                ? "border-red-500 focus:ring-red-500/30"
                : "border-gray-300 shadow-sm hover:border-amber-500/70"
            }
            text-sm font-medium`}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm flex items-center space-x-1.5 mt-1.5 pl-1"
        >
          <span className="text-xs">●</span>
          <span className="font-semibold">{error}</span>
        </motion.p>
      )}
    </div>
  );
};
