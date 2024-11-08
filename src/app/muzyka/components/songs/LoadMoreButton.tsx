import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface LoadMoreButtonProps {
  isVisible: boolean;
  onClick: () => void;
  remainingSongs?: number;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  isVisible, 
  onClick, 
  remainingSongs 
}) => {
  if (!isVisible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={onClick}
      className="w-full mt-4 mb-24 py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-md"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>
        Załaduj więcej {remainingSongs && `(pozostało ${remainingSongs} utworów)`}
      </span>
      <FaChevronDown className="text-gray-500" />
    </motion.button>
  );
};

export default React.memo(LoadMoreButton);