import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaHeart, FaUser } from "react-icons/fa";
import Image from "next/image";

interface PlaylistHeaderProps {
  filteredSongsCount: number;
  onPlay: () => void;
  onLike?: () => void;
  isLiked?: boolean;
  coverImage?: string;
  dominantColor?: string;
  isPlaying?: boolean;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  filteredSongsCount,
  onPlay,
  onLike,
  isLiked = false,
  coverImage,
  dominantColor,
  isPlaying,
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

  return (
    <motion.div
      className="relative min-h-[600px] w-full overflow-hidden"
      style={{
        background: dominantColor
          ? `linear-gradient(to bottom, ${dominantColor}, #0a1e3b)`
          : "linear-gradient(to bottom, #0a1e3b, #2a4a7f)",
      }}
    >
      {/* Tło z efektem parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: opacity,
          filter: `blur(${blur}px)`,
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      >
        {coverImage && (
          <Image
            src={coverImage}
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            alt="Playlist cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0a1e3b]" />
      </motion.div>

      {/* Animowane nuty w tle */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat"
          animate={{
            y: [0, -100],
            opacity: [0.1, 0.05],
          }}
          transition={{
            y: { duration: 20, repeat: Infinity, ease: "linear" },
            opacity: { duration: 10, repeat: Infinity, yoyo: true },
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex items-center space-x-4 text-white/60 text-sm">
          <div className="flex items-center space-x-2">
            <span>Baciata.pl</span>
          </div>
          <span>•</span>
          <span>{filteredSongsCount} utworów</span>
          <span>•</span>
          <span>Zaktualizowano: {new Date().toLocaleDateString("pl-PL")}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none mb-6"
            >
              {`Bachata Top lista ${new Date().getFullYear()}!`}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl text-white/80 mb-8"
            >
              Do nich tańczysz na imprezach w {new Date().getFullYear()} roku!
            </motion.p>
          </div>

          <div className="flex items-center space-x-6">
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
              onClick={onLike}
              className={`p-4 rounded-full transition-all duration-300 ${
                isLiked
                  ? "bg-white text-green-500"
                  : "bg-transparent border-2 border-white/20 text-white"
              }`}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <FaHeart className="h-6 w-6" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistHeader;
