import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaRegHeart,
  FaBookmark,
} from "react-icons/fa";
import { BadgeContainer } from "./BadgeContainer";
import { useImageFallback } from '../../../hooks/useImageFallback';
import type { SongCardProps } from "./types";

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isCurrentSong,
  isPlaying,
  isFavorite,
  onSongSelect,
  onToggleFavorite,
  onAddToPlaylist,
}) => {
  const [isLocalFavorite, setIsLocalFavorite] = useState(isFavorite);
  const { imageSrc, handleError } = useImageFallback(song.youtubeId);

  useEffect(() => {
    setIsLocalFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLocalFavorite(!isLocalFavorite);
    onToggleFavorite?.(song.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group bg-[#181818] rounded-md p-4 hover:bg-[#282828] transition-all duration-200 cursor-pointer"
      onClick={() => onSongSelect(song.id)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square mb-4">
        <Image
          src={imageSrc}
          alt={`${song.title} - ${song.artist}`}
          width={300}
          height={300}
          className="object-cover rounded-md"
          loading={isCurrentSong ? "eager" : "lazy"}
          onError={handleError}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
          {/* Buttons container */}
          <div className="absolute bottom-2 left-2 flex gap-2">
            {/* Add to playlist button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToPlaylist?.(song.id);
              }}
              className="p-2 text-white hover:scale-110 transition-transform rounded-full hover:bg-[#282828]"
              aria-label="Dodaj do playlisty"
            >
              <FaBookmark className="w-4 h-4" />
            </button>

            {/* Heart button */}
            <button
              onClick={handleFavoriteClick}
              className={`p-2 hover:scale-110 transition-all duration-200 rounded-full hover:bg-[#282828] 
                ${isLocalFavorite ? 'text-[#1ed760]' : 'text-white'}`}
              aria-label={isLocalFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            >
              <div className="transition-transform duration-200">
                {isLocalFavorite ? (
                  <FaHeart className="w-4 h-4" />
                ) : (
                  <FaRegHeart className="w-4 h-4" />
                )}
              </div>
            </button>
          </div>

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
        <p className="text-[#a7a7a7] text-sm truncate">{song.artist}</p>
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

