import React, { forwardRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onPasswordToggle?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, showPasswordToggle, showPassword, onPasswordToggle, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-white/90 text-sm font-medium mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            {...props}
            className={`
              w-full px-4 py-3 bg-white/5 border rounded-lg
              ${error ? 'border-red-400' : 'border-white/10'}
              text-white placeholder-white/50
              focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-red-400/20' : 'focus:ring-white/20'}
              focus:border-transparent
              transition-all duration-200
              ${showPasswordToggle ? 'pr-12' : 'pr-4'}
              ${className}
            `}
          />
          
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onPasswordToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 
                hover:text-white/80 transition-colors p-1"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="mt-2 text-red-400 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;