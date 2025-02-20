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
          <label className="block text-white text-sm font-semibold mb-2.5 tracking-wide">
            {label}
          </label>
        )}
        
        <div className="relative group">
          <input
            ref={ref}
            {...props}
            className={`
              w-full px-4 py-3.5 bg-white/10 border-2 rounded-xl
              ${error ? 'border-red-500' : 'border-white/20'}
              text-white placeholder-white/40
              focus:outline-none focus:ring-4 
              ${error ? 'focus:ring-red-500/20' : 'focus:ring-yellow-500/20'}
              focus:border-yellow-400
              group-hover:border-yellow-400/50
              transition-all duration-200
              ${showPasswordToggle ? 'pr-12' : 'pr-4'}
              text-sm font-medium
              ${className}
            `}
          />
          
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onPasswordToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 
                hover:text-yellow-400 transition-colors p-1.5"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="mt-2 text-red-400 text-sm font-medium flex items-center">
            <span className="mr-1.5">●</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;