import { memo } from "react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  label: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
}

export const ActionButton = memo(
  ({
    icon,
    onClick,
    label,
    variant = "default",
    size = "md",
    className = "",
    isActive = false,
    disabled = false,
  }: ActionButtonProps) => {
    const sizeClasses = {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2",
      lg: "p-2.5",
      xl: "p-3",
    };

    const variantClasses = {
      default: "bg-white/90 hover:bg-white",
      primary: "bg-amber-500/90 hover:bg-amber-500",
      secondary: "bg-gray-500/90 hover:bg-gray-500",
      success: "bg-green-500/90 hover:bg-green-500",
      warning: "bg-yellow-500/90 hover:bg-yellow-500",
      danger: "bg-red-500/90 hover:bg-red-500",
      info: "bg-amber-400/90 hover:bg-amber-400",
    };

    const activeClasses = isActive ? "ring-2 ring-amber-500 ring-offset-2" : "";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
      <motion.button
        whileTap={disabled ? {} : { scale: 0.95 }}
        className={`
        rounded-full backdrop-blur-sm transition-all z-20 group
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${activeClasses}
        ${disabledClasses}
        ${className}
      `}
        onClick={onClick}
        aria-label={label}
        disabled={disabled}
      >
        {icon}
      </motion.button>
    );
  }
);

ActionButton.displayName = "ActionButton";
