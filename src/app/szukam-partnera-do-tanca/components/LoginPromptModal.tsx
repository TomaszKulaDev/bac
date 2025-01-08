"use client";

import { motion } from "framer-motion";
import { FaLock, FaUnlock, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import Modal from "@/components/ui/Modal";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginPromptModal = ({
  isOpen,
  onClose,
}: LoginPromptModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Odkryj więcej możliwości! 🎭"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-8"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Animowana ikona */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-amber-200 rounded-full blur-xl opacity-30" />
            <div className="relative bg-gradient-to-br from-amber-400 to-amber-600 p-5 rounded-full">
              <FaLock className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Tekst główny */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">
              Czas na taneczny krok naprzód!
            </h3>
            <p className="text-gray-600 max-w-md">
              Zaloguj się, aby odblokować wszystkie funkcje i znaleźć idealnego
              partnera do tańca. Czeka na Ciebie cała społeczność pasjonatów! 🌟
            </p>
          </div>

          {/* Przyciski z ikonami */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/register")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-amber-500 to-amber-600 
                       text-white font-medium rounded-xl shadow-lg 
                       hover:shadow-amber-200/50 hover:shadow-xl 
                       transition-all duration-200"
            >
              <FaUserPlus className="w-5 h-5" />
              <span>Załóż konto</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/login")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                       bg-white text-amber-600 font-medium rounded-xl 
                       shadow-lg border-2 border-amber-100
                       hover:border-amber-200 hover:shadow-xl 
                       transition-all duration-200"
            >
              <FaSignInAlt className="w-5 h-5" />
              <span>Zaloguj się</span>
            </motion.button>
          </div>

          {/* Lista korzyści */}
          <div className="w-full max-w-md pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                "Filtrowanie profili",
                "Wyszukiwanie po lokalizacji",
                "Dopasowanie poziomu",
                "Wybór stylu tańca",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <FaUnlock className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};
