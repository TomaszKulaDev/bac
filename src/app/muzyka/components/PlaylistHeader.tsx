import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";
import { Song } from "../types";
import { getYouTubeThumbnail } from "../utils/youtube";

interface PlaylistHeaderProps {
  filteredSongsCount: number;
  dominantColor: string;
  onPlay: () => void;
  isPlaying: boolean;
  songs: Song[];
}

interface HeaderImage {
  position: number;
  imageName: string;
  title?: string;
}

const imageAnimationVariants = {
  initial: (index: number) => ({
    opacity: 0,
    scale: 0.8,
    rotate: -15,
    x: -50,
  }),
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    x: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.2,
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }),
  hover: {
    scale: 1.05,
    rotate: 5,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
    }
  },
  tap: {
    scale: 0.95,
    rotate: -5,
  }
};

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  filteredSongsCount,
  dominantColor,
  onPlay,
  isPlaying,
  songs,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerImages, setHeaderImages] = useState<HeaderImage[]>([]);

  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchHeaderImages = async () => {
      try {
        const response = await fetch('/api/header-images');
        if (!response.ok) throw new Error('Błąd podczas pobierania zdjęć');
        const data = await response.json();
        setHeaderImages(data);
      } catch (error) {
        console.error('Błąd:', error);
      }
    };

    fetchHeaderImages();
  }, []);

  const opacity = Math.max(0, Math.min(1, 1 - scrollPosition / 300));

  const topFiveSongs = useMemo(() => {
    return [...songs]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [songs]);

  return (
    <motion.div
      className="relative min-h-[400px] w-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          ${dominantColor || '#0a1e3b'} 0%, 
          rgba(10, 30, 59, 0.8) 50%,
          rgba(10, 30, 59, 0) 100%)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1e3b]/50 to-[#0a1e3b]" />

      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        style={{ opacity }}
      >
        <div className="flex justify-center mb-8 relative">
          <div className="flex items-center -space-x-8">
            {headerImages.map((image, index) => (
              <motion.div
                key={image.position}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  ${index === 2 ? 'w-64 h-64 z-30' : 
                    index === 1 || index === 3 ? 'w-48 h-48 z-20' : 
                    'w-40 h-40 z-10'}
                  relative rounded-full overflow-hidden
                  border-4 border-[#0a1e3b]/30
                  transform transition-transform duration-300 hover:scale-105
                  group
                `}
              >
                <Image
                  src={`/images/header/${image.imageName}`}
                  alt={`Header image ${image.position}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="text-sm font-medium text-blue-200/70 uppercase tracking-wider">
              BACHATA TOP LVL MUSIC {new Date().getFullYear()}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Twoja Muzyczna Przestrzeń
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="text-lg text-blue-200/70">
              Bachateros poznajcie nasze muzyczne hity!
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm text-blue-200/70">
              <span>{filteredSongsCount} utworów bachaty</span>
              <span>•</span>
              <span>Codzienna aktualizacja playlist</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlay}
              className="bg-white text-[#0a1e3b] px-8 py-3 rounded-full 
                font-medium flex items-center space-x-3 shadow-lg
                hover:bg-opacity-90 transition-all duration-300"
            >
              {isPlaying ? <FaPause className="h-4 w-4" /> : <FaPlay className="h-4 w-4" />}
              <span>{isPlaying ? 'Zatrzymaj' : 'Odtwórz wszystko'}</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ImagePositionSelector = ({ onSelect, currentImages }: {
  onSelect: (position: number) => void;
  currentImages: HeaderImage[];
}) => {
  const positions = [0, 1, 2, 3, 4]; // dostępne pozycje
  
  return (
    <div className="flex gap-4 justify-center mb-8">
      {positions.map((pos) => {
        const isOccupied = currentImages.some(img => img.position === pos);
        
        return (
          <button
            key={pos}
            onClick={() => onSelect(pos)}
            className={`
              relative w-12 h-12 rounded-full border-2
              flex items-center justify-center
              transition-all duration-300
              ${isOccupied 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-300 hover:border-blue-300'}
            `}
          >
            <span className="text-sm font-medium">{pos + 1}</span>
            {isOccupied && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default memo(PlaylistHeader);
