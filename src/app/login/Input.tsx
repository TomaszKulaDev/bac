import React, { forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onPasswordToggle?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      showPasswordToggle,
      showPassword,
      onPasswordToggle,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gray-700 text-sm font-medium mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            {...props}
            className={`
              w-full px-4 py-3 bg-white rounded-lg
              ${error ? "border-red-400" : "border-none"}
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 
              ${error ? "focus:ring-red-400/20" : "focus:ring-amber-500/50"}
              transition-all duration-200
              ${showPasswordToggle ? "pr-12" : "pr-4"}
              ${className}
            `}
          />

          {showPasswordToggle && (
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

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
