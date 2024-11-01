// src/app/muzyka/components/songs/SongList.tsx
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
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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

interface AutoSizerProps {
  children: ({ height, width }: { height: number; width: number }) => React.ReactNode;
}

interface OnItemsRenderedProps {
  visibleStartIndex: number;
  visibleStopIndex: number;
  overscanStartIndex: number;
  overscanStopIndex: number;
}

const ITEM_HEIGHT = 96;
const ITEM_PADDING = 16;

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
};

const SongList = memo(({ songs, ...props }: SongListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const LoadingState = () => (
    <div className="flex-1 grid place-items-center">
      <SongItemSkeleton />
    </div>
  );

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

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const song = visibleSongsList[index];
    return (
      <div style={{ ...style, paddingLeft: ITEM_PADDING, paddingRight: ITEM_PADDING }}>
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
      </div>
    );
  }, [visibleSongsList, props]);

  const onItemsRendered = useCallback(({ 
    visibleStartIndex, 
    visibleStopIndex 
  }: OnItemsRenderedProps) => {
    console.log(`Widoczne elementy od ${visibleStartIndex} do ${visibleStopIndex}`);
  }, []);

  if (error) {
    return (
      <div role="alert" className="p-4 bg-red-50 text-red-600 rounded-lg">
        Wystąpił błąd: {error.message}
      </div>
    );
  }

  return (
    <div 
      role="list"
      aria-label="Lista utworów"
      className="flex flex-col h-[calc(100vh-200px)]"
    >
      {props.showSearch && (
        <SearchInput 
          value={props.filterText}
          onChange={props.setFilterText}
        />
      )}
      
      <div className="flex-1 relative">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={visibleSongsList.length}
              itemSize={ITEM_HEIGHT}
              overscanCount={5}
              onItemsRendered={(props: OnItemsRenderedProps) => onItemsRendered(props)}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>

      {hasMoreSongs && (
        <div className="sticky bottom-0 w-full bg-gradient-to-t from-white pt-4">
          <LoadMoreButton 
            isVisible={hasMoreSongs}
            onClick={props.onLoadMore}
          />
        </div>
      )}
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
