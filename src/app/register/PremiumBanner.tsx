"use client";

import { motion } from "framer-motion";
import { FaCrown, FaUsers, FaCalendar, FaMusic, FaStar } from "react-icons/fa";

const premiumFeatures = [
  {
    icon: FaUsers,
    text: "Promuj swoją szkołę tańca",
  },
  {
    icon: FaCalendar,
    text: "Dodawaj i promuj wydarzenia",
  },
  {
    icon: FaStar,
    text: "Buduj społeczność tancerzy",
  },
  {
    icon: FaMusic,
    text: "Buduj swoją markę tancerza",
  },
];

export const PremiumBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 backdrop-blur-lg rounded-xl p-7 
        border border-white/10 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300"
      whileHover={{ scale: 1.02, translateX: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-400/20 p-3 rounded-full">
            <FaCrown className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Premium</h3>
            <p className="text-white/70">Rozwiń swój biznes taneczny</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">49 zł</div>
          <div className="text-white/60 text-sm">miesięcznie</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {premiumFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center text-white/80"
          >
            <feature.icon className="h-4 w-4 mr-2 text-yellow-400" />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-2 px-4 
          rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
      >
        Wypróbuj Premium
      </motion.button>
    </motion.div>
  );
};
