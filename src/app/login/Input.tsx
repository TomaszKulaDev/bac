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
          <label className="block text-gray-800 text-sm font-semibold mb-2.5 tracking-wide">
            {label}
          </label>
        )}

        <div className="relative group">
          <input
            ref={ref}
            {...props}
            className={`
              w-full px-4 py-3.5 bg-white border-2 rounded-xl
              ${error ? "border-red-500" : "border-gray-200"}
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-4 
              ${error ? "focus:ring-red-500/20" : "focus:ring-amber-500/20"}
              focus:border-amber-500
              group-hover:border-amber-500/50
              transition-all duration-200
              ${showPasswordToggle ? "pr-12" : "pr-4"}
              text-sm font-medium
              ${className}
            `}
          />

          {showPasswordToggle && (
            <button
              type="button"
              onClick={onPasswordToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                hover:text-amber-500 transition-colors p-2 rounded-lg
                focus:outline-none focus:text-amber-500
                hover:bg-amber-50"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-2 text-red-500 text-sm font-medium flex items-center">
            <span className="mr-1.5">●</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
