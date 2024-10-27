import Image from "next/image";
import { motion } from "framer-motion";
import { FaMusic, FaHeart, FaStar } from "react-icons/fa";

const BaciataRisingBanner: React.FC = () => {
  const floatingIcons = [
    { icon: <FaMusic className="text-3xl" />, delay: 0 },
    { icon: <FaHeart className="text-3xl" />, delay: 0.2 },
    { icon: <FaStar className="text-3xl" />, delay: 0.4 },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white py-16 px-4 mb-8 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-white/20"
            initial={{ y: "100%", x: `${index * 30}%` }}
            animate={{ 
              y: "-100%",
              x: [`${index * 30}%`, `${(index * 30) + 10}%`, `${index * 30}%`]
            }}
            transition={{
              y: { duration: 10, repeat: Infinity, ease: "linear", delay: item.delay },
              x: { duration: 5, repeat: Infinity, ease: "easeInOut", yoyo: true }
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-[#0a1e3b] px-8 py-3 rounded-full">
              <span className="text-white font-medium text-lg">Baciata.pl</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-bold tracking-[0.2em] text-white/80 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            BACIATA RISING
          </motion.h2>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-black text-center leading-tight tracking-[0.1em] text-white
              bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            NAJLEPSZE BACIATKI
          </motion.h1>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 text-white/60 bg-white/5 px-4 py-2 rounded-full">
            <FaMusic />
            <span>Top 100</span>
          </div>
          <div className="flex items-center space-x-2 text-white/60 bg-white/5 px-4 py-2 rounded-full">
            <FaHeart />
            <span>Ulubione</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BaciataRisingBanner;
