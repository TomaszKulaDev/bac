import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaBookmark, FaHeart } from "react-icons/fa";
import { Song, SortOption, SortOrder, Playlist } from "../../types";
import { motion } from "framer-motion";
import { getYouTubeThumbnail } from "../../utils/youtube";
import { getSortValue } from "../../utils/sortUtils";
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
  isMobile: boolean; // dodaj ten prop
  playlists: Playlist[];
}

const SongList: React.FC<SongListProps> = ({
  songs = [],
  visibleSongs,
  isPlaying,
  onSongSelect,
  onLoadMore,
  onCollapse,
  isPopularList,
  expandedPlaylist,
  setExpandedPlaylist,
  onAddToPlaylist,
  sortBy,
  sortOrder,
  onSortChange,
  currentSong,
  isPlaylistExpanded,
  filterText,
  setFilterText,
  showSearch,
  hasPlaylists,
  isAuthenticated,
  isMobile, // dodaj ten prop
  playlists,
}) => {
  const [showNotification, setShowNotification] = useState(false);

  const sortedAndFilteredSongs = useSortedAndFilteredSongs(
    songs,
    sortBy,
    sortOrder,
    filterText
  );

  const handleSort = useCallback(
    (newSortBy: SortOption) => {
      const newSortOrder =
        sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
      onSortChange(newSortBy, newSortOrder);
    },
    [sortBy, sortOrder, onSortChange]
  );

  const onSongSelectMemoized = useCallback(
    (songId: string) => {
      onSongSelect(songId);
    },
    [onSongSelect]
  );

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

  const SongItemLazy = dynamic(() => import('./SongItem'), {
    loading: () => <SongItemSkeleton />,
    ssr: false
  });

  const sortedSongsCount = useMemo(() => 
    sortedAndFilteredSongs.length, 
    [sortedAndFilteredSongs]
  );

  return (
    <div className="flex flex-col h-full w-full">
      {showSearch && (
        <SearchInput value={filterText} onChange={setFilterText} />
      )}

      <div className="flex-grow overflow-y-auto">
        <motion.ul
          layout
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 px-4"
        >
          {sortedAndFilteredSongs.map((song) => (
            <SongItemLazy
              key={song.id}
              song={song}
              currentSong={currentSong}
              isPlaying={isPlaying}
              isAuthenticated={isAuthenticated}
              isPlaylistExpanded={isPlaylistExpanded}
              expandedPlaylist={expandedPlaylist}
              hasPlaylists={hasPlaylists}
              onSelect={onSongSelectMemoized}
              onAddToPlaylist={onAddToPlaylist}
              playlists={playlists}
            />
          ))}
        </motion.ul>

        <LoadMoreButton
          isVisible={!isPopularList && visibleSongs < songs.length}
          onClick={onLoadMore}
        />
      </div>
    </div>
  );
};

export default React.memo(SongList, (prevProps, nextProps) => {
  return (
    prevProps.songs === nextProps.songs &&
    prevProps.currentSong?.id === nextProps.currentSong?.id &&
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.playlists === nextProps.playlists
  );
});
