import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { BadgeContainer } from "./BadgeContainer";
import { useImageFallback } from "../../hooks/useImageFallback";
import type { SongCardProps } from "./types";

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isCurrentSong,
  isPlaying,
  onSongSelect,
}) => {
  const { imageSrc, handleError } = useImageFallback(song.youtubeId);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group bg-[#181818] rounded-md p-4 hover:bg-[#282828] transition-all duration-200 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-square mb-4">
        <Image
          src={imageSrc}
          alt={`${song.title} - ${song.artist}`}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          onError={handleError}
        />

        {/* Play Button Overlay */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200">
          <button
            className="w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-lg"
            onClick={() => onSongSelect(song.id)}
          >
            <FaPlay className="text-black text-xl ml-1" />
          </button>
        </div>

        {/* Badges */}
        <BadgeContainer song={song} />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-white font-bold text-base truncate">
          {song.title}
        </h3>
        <p className="text-[#a7a7a7] text-sm truncate">{song.artist}</p>
      </div>
    </motion.div>
  );
};
