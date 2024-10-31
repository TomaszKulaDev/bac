import React, { useEffect, useCallback, memo, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { Song, Playlist } from "../../types";
import { getYouTubeThumbnail } from "../../utils/youtube";
import { usePlaylistManagement } from "../../hooks/usePlaylistManagement";

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

const SongItem = memo(({ song, onSelect, onAddToPlaylist, ...props }: SongItemProps) => {
  const isCurrentSong = song.id === props.currentSong?.id;
  const { isInPlaylist } = usePlaylistManagement(song.id, props.playlists);

  const handleClick = useCallback(() => {
    onSelect(song.id);
  }, [song.id, onSelect]);

  const handleAddToPlaylist = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToPlaylist(song.id);
  }, [song.id, onAddToPlaylist]);

  const itemVariants = {
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

  const SongImage = ({ song }: { song: Song }) => {
    return (
      <div className="relative aspect-video w-full">
        <Image
          src={getYouTubeThumbnail(song.youtubeId)}
          alt={song.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
          priority={false}
          loading="lazy"
        />
      </div>
    );
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
        <motion.div
          className="w-14 h-14 mr-4 relative flex-shrink-0 rounded-lg overflow-hidden shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <SongImage song={song} />
          {song.id === props.currentSong?.id && props.isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            >
              <FaPlay className="text-white text-xl" />
            </motion.div>
          )}
        </motion.div>

        <div className="min-w-0 flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate text-sm">
              {song.title.length > 30
                ? `${song.title.slice(0, 50)}...`
                : song.title}
            </h3>
            {song.impro && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                Impro
              </span>
            )}
            {song.beginnerFriendly && (
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                Dla początkujących
              </span>
            )}
            {isInPlaylist && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                W playliście
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 truncate">
            {song.artist.length > 30
              ? `${song.artist.slice(0, 30)}...`
              : song.artist}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {props.playlists?.map(playlist => 
              playlist.songs.includes(song.id) && (
                <span 
                  key={playlist.id}
                  className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full flex items-center gap-1 border border-blue-100"
                >
                  <FaBookmark className="text-xs" />
                  {playlist.name}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {props.hasPlaylists && props.isAuthenticated && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToPlaylist}
          className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
          aria-label={`Dodaj ${song.title} do playlisty`}
        >
          <FaBookmark className="text-lg" />
        </motion.button>
      )}
    </motion.li>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.song === nextProps.song &&
    prevProps.currentSong?.id === nextProps.currentSong?.id &&
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.playlists === nextProps.playlists
  );
});

SongItem.displayName = 'SongItem';

export default SongItem;
