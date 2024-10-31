import React, { useState, useMemo, useCallback, useEffect, memo } from "react";
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
}

const SongList = memo(({ songs, ...props }: SongListProps) => {
  const sortedAndFilteredSongs = useSortedAndFilteredSongs(
    songs,
    props.sortBy,
    props.sortOrder,
    props.filterText
  );

  const visibleSongsList = useMemo(() => 
    sortedAndFilteredSongs.slice(0, props.visibleSongs),
    [sortedAndFilteredSongs, props.visibleSongs]
  );

  const hasMoreSongs = sortedAndFilteredSongs.length > props.visibleSongs;

  const renderSongItem = useCallback((song: Song) => (
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
    />
  ), [
    props.currentSong,
    props.isPlaying,
    props.isAuthenticated,
    props.isPlaylistExpanded,
    props.expandedPlaylist,
    props.hasPlaylists,
    props.onSongSelect,
    props.onAddToPlaylist,
    props.playlists
  ]);

  return (
    <div className="space-y-4 pb-24">
      {props.showSearch && (
        <SearchInput 
          value={props.filterText}
          onChange={props.setFilterText}
        />
      )}
      
      {visibleSongsList.map(renderSongItem)}
      
      <LoadMoreButton 
        isVisible={hasMoreSongs}
        onClick={props.onLoadMore}
      />
    </div>
  );
});

SongList.displayName = 'SongList';

export default React.memo(SongList, (prevProps, nextProps) => {
  return (
    prevProps.songs === nextProps.songs &&
    prevProps.currentSong?.id === nextProps.currentSong?.id &&
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.visibleSongs === nextProps.visibleSongs &&
    prevProps.filterText === nextProps.filterText &&
    JSON.stringify(prevProps.playlists) === JSON.stringify(nextProps.playlists)
  );
});
