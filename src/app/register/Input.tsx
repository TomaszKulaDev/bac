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
  autoComplete?: string;
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
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-gray-700 text-sm font-semibold tracking-wide">
            {label}
          </label>
          {isPassword && label === "Hasło" && onTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-amber-500 hover:text-amber-600 text-sm transition-all 
                flex items-center space-x-1.5 hover:bg-amber-50 px-3 py-1.5 rounded-lg
                border border-transparent hover:border-amber-200"
            >
              {showPasswords ? (
                <>
                  <FaEyeSlash className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Ukryj hasła</span>
                </>
              ) : (
                <>
                  <FaEye className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Pokaż hasła</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
        </div>
        <input
          type={isPassword ? (showPasswords ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-11 pr-4 py-3.5
            bg-white border rounded-xl text-gray-700
            focus:outline-none focus:ring-2 focus:ring-amber-500/20 
            focus:border-amber-500 group-hover:border-amber-500/50
            placeholder-gray-400 transition-all duration-200
            ${
              error
                ? "border-red-400 focus:ring-red-400/20"
                : "border-gray-200 shadow-sm hover:border-gray-300"
            }
            text-sm`}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm flex items-center space-x-1.5 mt-1.5"
        >
          <span className="text-xs">●</span>
          <span className="font-medium">{error}</span>
        </motion.p>
      )}
    </div>
  );
};
