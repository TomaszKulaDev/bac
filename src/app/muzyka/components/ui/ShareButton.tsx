import { FaShare } from "react-icons/fa";
import { motion } from "framer-motion";

interface ShareButtonProps {
  onClick: () => void;
  className?: string;
}

export const ShareButton = ({ onClick, className = "" }: ShareButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 bg-gray-50 
        hover:bg-gray-100 rounded-full border border-gray-200 
        shadow-sm transition-all duration-200 ${className}`}
    >
      <FaShare className="text-gray-600" />
      <span className="text-gray-700 font-medium hidden sm:inline">
        Udostępnij
      </span>
    </motion.button>
  );
};
