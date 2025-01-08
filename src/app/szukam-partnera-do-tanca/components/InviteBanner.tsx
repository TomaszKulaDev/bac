"use client";

import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

export const InviteBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white border border-gray-100 shadow-lg rounded-2xl p-6 mb-8"
    >
      {/* Przycisk zamknięcia */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 p-2 text-gray-400 
                 hover:text-gray-600 rounded-full hover:bg-gray-100 
                 transition-colors"
      >
        <FaTimes className="w-4 h-4" />
      </button>

      {/* Treść */}
      <div
        className="flex flex-col md:flex-row items-center justify-between 
                    max-w-5xl mx-auto gap-6"
      >
        {/* Lewa strona - tekst */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Znajdź partnera do tańca w swojej okolicy
          </h2>
          <p className="text-gray-600 mb-0 md:pr-8">
            Dołącz do społeczności tancerzy i rozwijaj swoją pasję. Czekają na
            Ciebie setki osób z podobnymi zainteresowaniami!
          </p>
        </div>

        {/* Prawa strona - przycisk */}
        <div className="flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/register")}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 
                     text-white font-medium rounded-full shadow-amber-100 
                     shadow-lg hover:shadow-amber-200 hover:shadow-xl 
                     transition-all duration-200"
          >
            Dołącz bezpłatnie
          </motion.button>
        </div>
      </div>

      {/* Dekoracyjny element */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                    from-amber-500 to-amber-600 rounded-b-2xl"
      />
    </motion.div>
  );
};
