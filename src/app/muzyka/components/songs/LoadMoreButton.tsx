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
    <div className="w-full flex justify-center my-4">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={onClick}
        className="py-3 px-6 bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] 
          text-white hover:shadow-lg
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
    </div>
  );
};

export default React.memo(LoadMoreButton);
