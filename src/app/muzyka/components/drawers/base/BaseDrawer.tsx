import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxHeight?: string;
}

const BaseDrawer: React.FC<BaseDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = "60vh",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 rounded-t-3xl"
            style={{ maxHeight }}
          >
            <div className="sticky top-0 bg-white p-4 border-b rounded-t-3xl">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-xl font-semibold text-center">{title}</h2>
            </div>
            <div className="overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BaseDrawer;
