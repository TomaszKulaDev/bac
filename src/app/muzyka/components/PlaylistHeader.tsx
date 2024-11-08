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
    <div className="relative min-h-[600px] w-full bg-gradient-to-b from-[#0a1e3b] to-[#2a4a7f] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[-50%] left-0 right-0 h-[200%]">
          <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float-continuous" />
          <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float-continuous" 
               style={{ top: '50%' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex items-center space-x-4 text-white/60 text-sm mb-8">
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

          <div className="flex items-center space-x-4">
            <button 
              onClick={onPlay}
              className="bg-white hover:bg-white/90 text-[#0a1e3b] px-8 py-4 rounded-full 
                font-medium flex items-center space-x-3 transform transition 
                hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaPlay className="h-5 w-5" />
              <span>Odtwórz</span>
            </button>
            
            <button 
              onClick={onLike}
              className={`p-4 rounded-full border-2 border-white/20 transition shadow-lg
                ${isLiked ? 'bg-white text-[#0a1e3b]' : 'text-white hover:bg-white/10'}`}
            >
              <FaHeart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
