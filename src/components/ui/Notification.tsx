import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const Notification = ({ type, message, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        onClick={onClose}
        className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg cursor-pointer
          ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white
          flex items-center gap-2 z-50`}
      >
        {message}
        <button className="ml-2 hover:opacity-80">✕</button>
      </motion.div>
    </AnimatePresence>
  );
};