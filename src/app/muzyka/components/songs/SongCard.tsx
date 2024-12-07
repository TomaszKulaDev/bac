import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
import { BadgeContainer } from "./BadgeContainer";
import type { SongCardProps } from "./types";

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isCurrentSong,
  isPlaying,
  isFavorite,
  onSongSelect,
  onToggleFavorite
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group bg-[#181818] rounded-md p-4 hover:bg-[#282828] transition-all duration-200 cursor-pointer"
      onClick={() => onSongSelect(song.id)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square mb-4">
        <Image
          src={`https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`}
          alt={`${song.title} - ${song.artist}`}
          width={300}
          height={300}
          className="object-cover rounded-md"
          loading={isCurrentSong ? "eager" : "lazy"}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
          {/* Heart button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(song.id);
            }}
            className="absolute top-2 right-2 text-white hover:scale-110 transition-transform"
          >
            {isFavorite ? <FaHeart className="text-[#1ed760]" /> : <FaRegHeart />}
          </button>

          {/* Play/Pause button */}
          <button 
            className="absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSongSelect(song.id);
            }}
          >
            {isCurrentSong && isPlaying ? (
              <FaPause className="text-black text-xl" />
            ) : (
              <FaPlay className="text-black text-xl ml-1" />
            )}
          </button>
        </div>

        {/* Badges */}
        <BadgeContainer song={song} />
      </div>

      {/* Song info */}
      <div className="space-y-1">
        <h3 className="text-white font-bold text-base truncate">
          {song.title}
        </h3>
        <p className="text-[#a7a7a7] text-sm truncate">
          {song.artist}
        </p>
      </div>

      {/* Current song indicator */}
      {isCurrentSong && (
        <div className="absolute top-2 left-2 w-3 h-3">
          <span className="animate-pulse w-2 h-2 bg-[#1ed760] rounded-full absolute" />
        </div>
      )}
    </motion.div>
  );
};
