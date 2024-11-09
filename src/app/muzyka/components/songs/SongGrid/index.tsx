import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SongCard } from './SongCard';
import { FilterPanel } from './filters/FilterPanel';
import { useFilters } from './filters/hooks/useFilters';
import type { SongGridProps } from './types';
import LoadMoreButton from '../LoadMoreButton';
import SongGridSkeleton from './SongGridSkeleton';

const SongGrid: React.FC<SongGridProps> = ({ songs, isLoading, error, ...props }) => {
  const { filters, updateFilter, clearFilters, filteredSongs, hasActiveFilters } = useFilters(songs);
  const [visibleSongs, setVisibleSongs] = useState<number>(20);
  
  const currentSongs = useMemo(() => 
    filteredSongs.slice(0, visibleSongs),
    [filteredSongs, visibleSongs]
  );

  const hasMoreSongs = filteredSongs.length > visibleSongs;
  const remainingSongs = filteredSongs.length - visibleSongs;

  const handleLoadMore = useCallback(() => {
    setVisibleSongs(prev => prev + 20);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-white p-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">
            Szybki wybór
          </h2>
        </div>
        <SongGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <p className="text-red-600">Wystąpił błąd podczas ładowania utworów</p>
          <p className="text-sm text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          Szybki wybór
        </h2>
        {hasActiveFilters && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-500"
          >
            Znaleziono: {filteredSongs.length} utworów
          </motion.span>
        )}
      </div>
      
      <FilterPanel
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
      >
        {currentSongs.map((song) => (
          <motion.div
            key={song.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <SongCard 
              song={song}
              isCurrentSong={song.id === props.currentSongId}
              isFavorite={props.favorites.has(song.id)}
              isPlaying={props.isPlaying}
              onSongSelect={props.onSongSelect}
              onAddToPlaylist={props.onAddToPlaylist}
              onToggleFavorite={props.onToggleFavorite}
            />
          </motion.div>
        ))}
      </motion.div>

      {hasMoreSongs && (
        <LoadMoreButton 
          isVisible={hasMoreSongs}
          onClick={handleLoadMore}
          remainingSongs={remainingSongs}
        />
      )}
    </div>
  );
};

export default SongGrid;