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
    <div className="space-y-2.5">
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-white/90 text-sm font-medium block">
            {label}
          </label>
          {isPassword && label === "Hasło" && onTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors 
                flex items-center space-x-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10"
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
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-white/40" />
        </div>
        <input
          type={isPassword ? (showPasswords ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-11 pr-4 py-3 
            bg-white/5 border border-white/10 rounded-xl text-white
            focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent
            placeholder-white/30 transition-all duration-200
            ${error ? "border-red-400/50 focus:ring-red-400/50" : "hover:border-white/20"}
            text-sm`}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm flex items-center space-x-1.5"
        >
          <span className="text-xs">●</span>
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  );
};
