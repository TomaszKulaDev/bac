// src/app/muzyka/components/songs/SongList.tsx
import React, { useState, useMemo, useCallback, useEffect, memo } from "react";
import Image from "next/image";
import { FaPlay, FaBookmark, FaHeart } from "react-icons/fa";
import { Song, SortOption, SortOrder, Playlist } from "../../types";
import { motion } from "framer-motion";
import { getYouTubeThumbnail } from "../../utils/youtube";
import { useSortedAndFilteredSongs } from "../../hooks/useSortedAndFilteredSongs";
import SongItem from "./SongItem";
import SearchInput from "./SearchInput";
import LoadMoreButton from "./LoadMoreButton";
import dynamic from 'next/dynamic';
import SongItemSkeleton from "./SongItemSkeleton";

interface SongListProps {
  songs: Song[];
  visibleSongs: number;
  isPlaying: boolean;
  isLoading: boolean;
  onSongSelect: (songId: string) => void;
  onLoadMore: () => void;
  onCollapse: () => void;
  isPopularList: boolean;
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  onAddToPlaylist: (songId: string) => void;
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (newSortBy: SortOption, newSortOrder: SortOrder) => void;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  currentSong: Song | null;
  isPlaylistExpanded: boolean;
  showSearch: boolean;
  hasPlaylists: boolean;
  isAuthenticated: boolean;
  isMobile: boolean;
  playlists: Playlist[];
  currentPlaylistId: string | null;
}

const SongList = memo(({ songs, ...props }: SongListProps) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedAndFilteredSongs = useSortedAndFilteredSongs(
    songs,
    props.sortBy,
    props.sortOrder,
    props.filterText,
    props.currentPlaylistId,
    props.playlists
  );

  const visibleSongsList = useMemo(() => 
    sortedAndFilteredSongs.slice(0, visibleCount),
    [sortedAndFilteredSongs, visibleCount]
  );

  const handleToggleVisibility = useCallback(() => {
    if (isExpanded) {
      setVisibleCount(8);
      setIsExpanded(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      setVisibleCount(sortedAndFilteredSongs.length);
      setIsExpanded(true);
    }
  }, [isExpanded, sortedAndFilteredSongs.length]);

  const remainingSongs = useMemo(() => 
    isExpanded ? 0 : sortedAndFilteredSongs.length - visibleCount,
    [sortedAndFilteredSongs.length, visibleCount, isExpanded]
  );

  return (
    <div 
      role="list"
      aria-label="Lista utworów"
      className="flex flex-col w-full"
    >
      {props.showSearch && (
        <SearchInput 
          value={props.filterText}
          onChange={props.setFilterText}
        />
      )}
      
      <div className="space-y-4 pb-32">
        {visibleSongsList.map((song) => (
          <SongItem 
            key={song.id}
            song={song}
            currentSong={props.currentSong}
            isPlaying={props.isPlaying}
            isAuthenticated={props.isAuthenticated}
            isPlaylistExpanded={props.isPlaylistExpanded}
            expandedPlaylist={props.expandedPlaylist}
            hasPlaylists={props.hasPlaylists}
            onSelect={props.onSongSelect}
            onAddToPlaylist={props.onAddToPlaylist}
            playlists={props.playlists}
            setCurrentPlaylistId={props.setExpandedPlaylist}
            currentPlaylistId={null}
          />
        ))}

        {sortedAndFilteredSongs.length > 20 && (
          <div className="w-full pt-4 mb-24">
            <LoadMoreButton 
              isVisible={true}
              onClick={handleToggleVisibility}
              remainingSongs={remainingSongs}
              isExpanded={isExpanded}
            />
          </div>
        )}
      </div>
    </div>
  );
});

SongList.displayName = 'SongList';

export default React.memo(SongList, (prevProps, nextProps) => {
  const arePlaylistsEqual = (prev: Playlist[], next: Playlist[]) => {
    if (prev.length !== next.length) return false;
    return prev.every((playlist, index) => 
      playlist.id === next[index].id &&
      playlist.songs.length === next[index].songs.length
    );
  };

  return (
    prevProps.songs === nextProps.songs &&
    prevProps.currentSong?.id === nextProps.currentSong?.id &&
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.visibleSongs === nextProps.visibleSongs &&
    prevProps.filterText === nextProps.filterText &&
    arePlaylistsEqual(prevProps.playlists, nextProps.playlists)
  );
});

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(243, 244, 246, 1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
  },
};
