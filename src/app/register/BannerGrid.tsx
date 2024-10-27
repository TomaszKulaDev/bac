"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import Image from "next/image";
import {
  FaUsers,
  FaCalendar,
  FaHeart,
  FaCrown,
  FaMusic,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

interface BannerItem {
  icon: IconType;
  title: string;
  description: string;
  image: string;
  position: "left" | "right";
}

const bannerData: BannerItem[] = [
  {
    icon: FaUsers,
    title: "Społeczność",
    description: "Dołącz do tysięcy pasjonatów bachaty",
    image: "/images/community.jpg",
    position: "left",
  },
  {
    icon: FaCalendar,
    title: "Wydarzenia",
    description: "Bądź na bieżąco z wydarzeniami",
    image: "/images/events.jpg",
    position: "right",
  },
  {
    icon: FaHeart,
    title: "Pasja",
    description: "Rozwijaj swoją taneczną pasję",
    image: "/images/passion.jpg",
    position: "left",
  },
  {
    icon: FaCrown,
    title: "Premium",
    description: "Ekskluzywne funkcje dla Ciebie",
    image: "/images/premium.jpg",
    position: "right",
  },
];

const BannerCard = ({
  banner,
  index,
  direction,
}: {
  banner: BannerItem;
  index: number;
  direction: "left" | "right";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-[220px] w-full overflow-hidden rounded-2xl 
        hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500"
    >
      <Image
        src={banner.image}
        alt={banner.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        priority={index < 2}
      />
      
      {/* Ulepszone gradienty */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1e3b]/95 via-[#0a1e3b]/80 to-transparent
        after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 after:to-transparent" />
      
      {/* Animated pattern z lepszą animacją */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-all duration-700">
        <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-yellow-600/5 group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
      </div>

      {/* Glass effect container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between backdrop-blur-[2px]">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-xl
                shadow-lg shadow-yellow-400/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-[#0a1e3b]/90 p-2.5 rounded-xl backdrop-blur-sm">
                <banner.icon className="h-6 w-6 text-yellow-400" />
              </div>
            </motion.div>
            <div>
              <motion.h3 
                className="text-xl font-bold text-white group-hover:text-yellow-400 
                  transition-colors duration-300 tracking-wide"
                whileHover={{ x: 5 }}
              >
                {banner.title}
              </motion.h3>
              <p className="text-white/70 text-sm mt-1 max-w-[280px] group-hover:text-white/90 
                transition-colors duration-300">
                {banner.description}
              </p>
            </div>
          </div>

          {/* Ulepszone statystyki */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <motion.div 
              className="flex items-center space-x-2 text-white/60 bg-white/5 
                backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5
                hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FaUsers className="h-3.5 w-3.5" />
              <span className="text-sm">1000+</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-white/60 bg-white/5 
                backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5
                hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FaStar className="h-3.5 w-3.5" />
              <span className="text-sm">Premium</span>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.button
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-2.5 px-5 
            rounded-lg font-medium transition-all duration-300 hover:from-yellow-500 
            hover:to-yellow-700 flex items-center justify-center space-x-2 text-sm
            opacity-0 group-hover:opacity-100 transform translate-y-4 
            group-hover:translate-y-0 shadow-lg shadow-yellow-400/20"
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Dowiedz się więcej</span>
          <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export const BannerGrid = () => {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl border border-white/10">
      <motion.div 
        className="flex items-center space-x-2 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full">
          <div className="bg-[#0a1e3b] px-4 py-1.5 rounded-full">
            <span className="text-white font-medium">Odkryj więcej</span>
          </div>
        </div>
      </motion.div>
      
      {bannerData.map((banner, index) => (
        <BannerCard
          key={index}
          banner={banner}
          index={index}
          direction={banner.position}
        />
      ))}
    </div>
  );
};
