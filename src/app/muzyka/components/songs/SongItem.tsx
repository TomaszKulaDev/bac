import React, { useEffect, useCallback, memo, useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FaPlay, FaBookmark, FaHeart } from "react-icons/fa";
import { Song, Playlist } from "../../types";
import { getYouTubeThumbnail } from "../../utils/youtube";
import { usePlaylistManagement } from "../../hooks/usePlaylistManagement";
import { SongThumbnail } from "./SongThumbnail";
import { SongTitle } from "./SongTitle";
import { SongArtist } from "./SongArtist";
import { SongTags } from "./tags/SongTags";
import { AddToPlaylistButton } from "./buttons/AddToPlaylistButton";

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

const SongItem = memo(
  ({ song, onSelect, onAddToPlaylist, ...props }: SongItemProps) => {
    const isCurrentSong = song.id === props.currentSong?.id;
    const { isInPlaylist } = usePlaylistManagement(song.id, props.playlists);

    const handleClick = useCallback(() => {
      onSelect(song.id);
    }, [song.id, onSelect]);

    const handleAddToPlaylist = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToPlaylist(song.id);
      },
      [song.id, onAddToPlaylist]
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
            isPlaying={props.isPlaying}
          />
          <div className="min-w-0 flex-grow">
            <SongTitle title={song.title} />
            <SongArtist artist={song.artist} />
            <SongTags
              song={song}
              isInPlaylist={isInPlaylist}
              playlists={props.playlists}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {props.isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500"
            >
              <FaHeart className="text-xl" />
            </motion.button>
          )}
          {props.isPlaylistExpanded && props.expandedPlaylist && props.hasPlaylists && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToPlaylist(song.id);
              }}
              className="p-2 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-500"
            >
              <FaBookmark className="text-xl" />
            </motion.button>
          )}
        </div>
      </motion.li>
    );
  }
);

SongItem.displayName = "SongItem";

export default SongItem;
