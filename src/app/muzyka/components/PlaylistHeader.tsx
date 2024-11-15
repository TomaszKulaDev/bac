import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaHeart, FaUser, FaShare } from "react-icons/fa";
import Image from "next/image";

interface Artist {
  name: string;
  image?: string;
}

interface PlaylistHeaderProps {
  filteredSongsCount: number;
  onPlay: () => void;
  coverImage?: string;
  dominantColor?: string;
  isPlaying?: boolean;
  artists?: Artist[];
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  filteredSongsCount,
  onPlay,
  coverImage,
  dominantColor,
  isPlaying,
  artists = [],
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, Math.min(1, 1 - scrollPosition / 300));
  const blur = Math.min(20, scrollPosition / 10);

  function showSuccessToast(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <motion.div
      className="relative min-h-[500px] w-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          ${dominantColor || '#0a1e3b'} 0%, 
          rgba(10, 30, 59, 0.8) 50%,
          rgba(10, 30, 59, 0) 100%)`
      }}
    >
      {/* Overlay gradient dla lepszego przejścia */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1e3b]/50 to-[#0a1e3b]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Sekcja zdjęć */}
        <div className="flex justify-center mb-12 relative">
          <div className="flex items-center relative">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 1 ? 0 : index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                  ${index === 1 ? 'w-32 h-32 z-20' : 'w-24 h-24 z-10'}
                  ${index === 0 ? '-mr-4' : index === 2 ? '-ml-4' : ''}
                  rounded-full overflow-hidden relative
                  border-2 border-blue-800/30
                  ${index === 1 ? 'border-4' : 'border-2'}
                  hover:scale-105 transition-transform duration-300
                `}
              >
                <Image
                  src={artists[index]?.image || "/images/default-avatar.png"}
                  layout="fill"
                  objectFit="cover"
                  alt={artists[index]?.name || ""}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tekst */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-sm text-blue-200/70"
          >
            <span>DISCOVERY BACIATA.PL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Rising tracks from new and upcoming artists
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-blue-200/70 max-w-2xl mx-auto"
          >
            Be the first to listen to these future hit songs
          </motion.p>

          {/* Oryginalne buttony - bez zmian */}
          <div className="flex items-center justify-center space-x-6 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] px-8 py-4 rounded-full 
                font-medium flex items-center space-x-3 shadow-lg hover:shadow-yellow-400/20 
                hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onPlay}
              disabled={!filteredSongsCount}
              title={!filteredSongsCount ? "Brak utworów do odtworzenia" : "Odtwórz playlistę"}
            >
              <FaPlay className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span>{isPlaying ? 'Zatrzymaj' : 'Odtwórz'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                showSuccessToast('Link skopiowany do schowka!');
              }}
              className="p-4 rounded-full transition-all duration-300 
                bg-transparent border-2 border-white/20 text-white 
                hover:bg-white/10"
              title="Udostępnij playlistę"
            >
              <FaShare className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-blue-200/70 pt-4">
            <span>{filteredSongsCount} utworów</span>
            <span>•</span>
            <span>Aktualizowane codziennie</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistHeader;
