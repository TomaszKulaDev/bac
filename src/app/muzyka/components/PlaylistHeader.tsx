import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaHeart } from 'react-icons/fa';

interface PlaylistHeaderProps {
  filteredSongsCount: number;
  onPlay?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  filteredSongsCount,
  onPlay,
  onLike,
  isLiked = false
}) => {
  return (
    <div className="relative min-h-[400px] bg-gradient-to-b from-[#0a1e3b] to-[#1a2e4b]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-4 mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full">
            <div className="bg-[#0a1e3b] px-4 py-1.5 rounded-full">
              <span className="text-white font-medium">Baciata.pl</span>
            </div>
          </div>
          <span className="text-white/60">Muzyka</span>
        </motion.div>

        {/* Title and description */}
        <div className="max-w-4xl space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tight"
          >
            Bachata Top lista 2024!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-white/80"
          >
            Do nich tańczysz na imprezach w 2024 roku!
          </motion.p>

          {/* Stats and actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            <div className="flex items-center space-x-2 text-white/60">
              <span>{filteredSongsCount} utworów</span>
              <span>•</span>
              <span>Zaktualizowano: {new Date().toLocaleDateString("pl-PL")}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={onPlay}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                  text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 
                  transform transition hover:scale-105"
              >
                <FaPlay className="h-4 w-4" />
                <span>Odtwórz</span>
              </button>
              
              <button 
                onClick={onLike}
                className={`p-3 rounded-full border border-white/20 transition
                  ${isLiked ? 'bg-pink-500 border-transparent' : 'hover:bg-white/10'}`}
              >
                <FaHeart className={`h-5 w-5 ${isLiked ? 'text-white' : 'text-white/60'}`} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
