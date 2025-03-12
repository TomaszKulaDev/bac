import React, { forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onPasswordToggle?: () => void;
  icon?: IconType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      showPasswordToggle,
      showPassword,
      onPasswordToggle,
      icon: Icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2.5">
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-gray-700 text-sm font-medium block">
              {label}
            </label>
            {showPasswordToggle && label === "Hasło" && (
              <button
                type="button"
                onClick={onPasswordToggle}
                className="text-gray-700 hover:text-[#ffd200] text-sm transition-colors 
                  flex items-center space-x-1.5 bg-gray-50 px-3 py-1 
                  rounded-full border border-gray-200"
              >
                {showPassword ? (
                  <>
                    <FaEyeSlash className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Ukryj hasło</span>
                  </>
                ) : (
                  <>
                    <FaEye className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Pokaż hasło</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}

          <input
            ref={ref}
            {...props}
            className={`
              w-full bg-white rounded-xl text-gray-800
              ${Icon ? "pl-11" : "pl-4"} pr-4 py-3
              border border-gray-200
              placeholder-gray-400
              focus:outline-none focus:ring-2 
              ${
                error
                  ? "border-red-400 focus:ring-red-400/50"
                  : "hover:border-gray-300 focus:ring-[#ffd200]/50 focus:border-[#ffd200]"
              }
              transition-all duration-200
              ${showPasswordToggle ? "pr-12" : "pr-4"}
              text-sm
              ${className}
            `}
          />

          {showPasswordToggle && !Icon && (
            <button
              type="button"
              onClick={onPasswordToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                hover:text-gray-600 transition-colors p-1"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
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
  }
);

Input.displayName = "Input";

export default Input;
