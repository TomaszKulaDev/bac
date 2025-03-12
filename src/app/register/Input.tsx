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
        <div className="flex justify-between items-center">
          <label className="text-gray-700 text-sm font-medium block">
            {label}
          </label>
          {isPassword && label === "Hasło" && onTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-gray-700 hover:text-[#ffd200] text-sm transition-all 
                flex items-center space-x-1.5 bg-gray-50/80 px-3 py-1 
                rounded-full border border-gray-200 hover:bg-gray-100
                hover:shadow-sm active:scale-95"
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
        <input
          type={isPassword ? (showPasswords ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3.5 
            bg-white border border-gray-200 rounded-xl text-gray-800
            focus:outline-none focus:ring-2 focus:ring-[#ffd200]/30
            focus:border-[#ffd200] placeholder-gray-400 
            transition-all duration-200 ease-in-out
            hover:border-[#ffd200]/50
            ${
              error
                ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
                : ""
            }
            text-sm shadow-sm backdrop-blur-sm
            group-hover:shadow-md`}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm flex items-center space-x-1.5"
        >
          <span className="text-xs">●</span>
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  );
};
