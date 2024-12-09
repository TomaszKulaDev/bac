import React from "react";
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
import { useImageFallback } from "../../../hooks/useImageFallback";
import type { SongCardProps } from "./types";
import { useLike } from "../../../hooks/useLike";

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isCurrentSong,
  isPlaying,
  isFavorite,
  onSongSelect,
  onToggleFavorite,
  onAddToPlaylist,
}) => {
  const { handleLike } = useLike();
  const { imageSrc, handleError } = useImageFallback(song.youtubeId);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await handleLike(song._id);
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
                ${song.isLiked ? "text-[rgb(30,215,96)]" : "text-white"}`}
              aria-label={song.isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            >
              <div className="flex items-center gap-1">
                {song.isLiked ? (
                  <FaHeart className="w-4 h-4 fill-current" />
                ) : (
                  <FaRegHeart className="w-4 h-4" />
                )}
                <span
                  className={`text-xs min-w-[16px] ${
                    song.isLiked ? "text-[rgb(30,215,96)]" : "text-[#a7a7a7]"
                  }`}
                >
                  {song.likesCount || 0}
                </span>
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
