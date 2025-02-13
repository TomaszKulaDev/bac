import React from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface LoadMoreButtonProps {
  isVisible: boolean;
  onClick: () => void;
  remainingSongs: number;
  isExpanded: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isVisible,
  onClick,
  remainingSongs,
  isExpanded,
}) => {
  if (!isVisible) return null;

  const buttonText = isExpanded
    ? "Zwiń listę"
    : `Załaduj więcej ${remainingSongs ? `(pozostało ${remainingSongs})` : ""}`;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={onClick}
      className="py-3 px-4 bg-[rgb(24,24,24)] hover:bg-[rgb(40,40,40)] 
        text-[rgb(167,167,167)] hover:text-white
        rounded-full flex items-center justify-center gap-2 
        transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={buttonText}
      aria-expanded={isExpanded}
      aria-controls="song-list"
      role="button"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-sm font-medium" aria-hidden="true">
        {buttonText}
      </span>
      {isExpanded ? (
        <FaChevronUp className="text-sm" aria-hidden="true" />
      ) : (
        <FaChevronDown className="text-sm" aria-hidden="true" />
      )}
    </motion.button>
  );
};

export default React.memo(LoadMoreButton);
