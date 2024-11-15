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

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  filteredSongsCount,
  dominantColor,
  onPlay,
  isPlaying,
  songs,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
            {topFiveSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  ${index === 2 ? 'w-48 h-48 z-30' : 
                    index === 1 || index === 3 ? 'w-40 h-40 z-20' : 
                    'w-36 h-36 z-10'}
                  relative rounded-full overflow-hidden
                  border-4 border-[#0a1e3b]/30
                  transform transition-transform duration-300 hover:scale-105
                  group
                `}
              >
                <Image
                  src={getYouTubeThumbnail(song.youtubeId)}
                  alt={`${song.title} - ${song.artist}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white text-center truncate">
                    {song.title}
                  </div>
                </div>
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
              DISCOVERY POLAND
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Rising tracks from new and<br />upcoming artists
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="text-lg text-blue-200/70">
              Be the first to listen to these future hit songs
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

export default memo(PlaylistHeader);
