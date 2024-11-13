import React, { useEffect, useCallback, memo, useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FaPlay, FaBookmark, FaHeart, FaRegHeart } from "react-icons/fa";
import { Song, Playlist } from "../../types";
import { getYouTubeThumbnail } from "../../utils/youtube";
import { usePlaylistManagement } from "../../hooks/usePlaylistManagement";
import { SongThumbnail } from "./SongThumbnail";
import { SongTitle } from "./SongTitle";
import { SongArtist } from "./SongArtist";
import { SongTags } from "./tags/SongTags";
import { AddToPlaylistButton } from "./buttons/AddToPlaylistButton";
import { useLike } from "../../hooks/useLike";

interface SongItemProps {
  song: Song;
  currentSong: Song | null;
  isPlaying: boolean;
  isAuthenticated: boolean;
  isPlaylistExpanded: boolean;
  expandedPlaylist: string | null;
  hasPlaylists: boolean;
  onSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  playlists: Playlist[];
  setCurrentPlaylistId: (id: string | null) => void;
  currentPlaylistId: string | null;
}

interface AnimationVariants {
  [key: string]: {
    opacity?: number;
    x?: number;
    scale?: number;
    backgroundColor?: string;
    transition?: {
      type?: string;
      stiffness?: number;
      damping?: number;
    };
  };
}


const SongItem: React.FC<SongItemProps> = ({
  song,
  currentSong,
  isPlaying,
  isAuthenticated,
  isPlaylistExpanded,
  expandedPlaylist,
  hasPlaylists,
  onSelect,
  onAddToPlaylist,
  playlists,
  setCurrentPlaylistId,
  currentPlaylistId
}) => {
  const isCurrentSong = song.id === currentSong?.id;
  
  const playlistManagement = usePlaylistManagement({
    playlists,
    onUpdatePlaylists: () => {},
    onPlayPlaylist: () => {},
    currentPlaylistId,
    showSuccessToast: () => {},
    showErrorToast: () => {},
    showInfoToast: () => {},
    isAuthenticated,
    songs: [],
    onCreatePlaylist: () => {},
    setCurrentPlaylistId
  });

  const isInCurrentPlaylist = playlistManagement.isInPlaylist(song.id, expandedPlaylist || '');

  const handleClick = useCallback(() => {
    onSelect(song.id);
  }, [onSelect, song.id]);

  const handleAddToPlaylist = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onAddToPlaylist(song.id);
    },
    [onAddToPlaylist, song.id]
  );

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(243, 244, 246, 1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.98 },
  };

  const { handleLike } = useLike();

  return (
    <motion.li
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      className={`flex items-center justify-between p-4 ${
        isCurrentSong ? "bg-blue-50 shadow-md" : "bg-white"
      } rounded-xl shadow-sm transition-all duration-200`}
      onClick={handleClick}
    >
      <div className="flex items-center flex-grow min-w-0">
        <SongThumbnail
          song={song}
          isCurrentSong={isCurrentSong}
          isPlaying={isPlaying}
        />
        <div className="min-w-0 flex-grow">
          <SongTitle title={song.title} />
          <SongArtist artist={song.artist} />
          <SongTags
            song={song}
            isInPlaylist={isInCurrentPlaylist}
            playlists={playlists}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(song._id);
            }}
            className={`p-2 rounded-full ${
              song.isLiked 
                ? "text-red-500" 
                : "text-gray-500 hover:text-red-500 hover:bg-red-50"
            }`}
            title={song.isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          >
            {song.isLiked ? (
              <FaHeart className="text-xl" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}
            <span className="ml-1 text-sm">
              {song.likesCount || 0}
            </span>
          </motion.button>
        )}
        {isPlaylistExpanded && expandedPlaylist && hasPlaylists && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToPlaylist(e);
            }}
            className="p-2 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-500"
          >
            <FaBookmark className="text-xl" />
          </motion.button>
        )}
      </div>
    </motion.li>
  );
};

export default SongItem;
