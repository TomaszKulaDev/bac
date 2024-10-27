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
      className="group relative h-[200px] w-full overflow-hidden rounded-2xl"
    >
      {/* Tło z obrazem */}
      <Image
        src={banner.image}
        alt={banner.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1e3b]/90 via-[#0a1e3b]/70 to-transparent backdrop-blur-[2px]" />
      
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float" />
      </div>

      {/* Glass effect container */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between backdrop-blur-sm bg-white/5">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-xl backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-[#0a1e3b]/80 p-2 rounded-xl backdrop-blur-sm">
              <banner.icon className="h-6 w-6 text-yellow-400" />
            </div>
          </motion.div>
          <div className="backdrop-blur-sm bg-white/5 p-2 rounded-lg">
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              {banner.title}
            </h3>
            <p className="text-white/80 text-sm">
              {banner.description}
            </p>
          </div>
        </div>
        
        <motion.button
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-2 px-4 rounded-lg 
            font-medium transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700
            flex items-center space-x-2 text-sm backdrop-blur-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Dowiedz się więcej</span>
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
