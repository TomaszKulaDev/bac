import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SongCard } from './SongCard';
import { FilterPanel } from './filters/FilterPanel';
import { useFilters } from './filters/hooks/useFilters';
import type { SongGridProps } from './types';
import LoadMoreButton from '../LoadMoreButton';

const SongGrid: React.FC<SongGridProps> = ({ songs, ...props }) => {
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

  return (
    <div className="w-full bg-white p-1 pb-16">
      <div className="flex justify-between items-center mb-2 px-2">
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
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2 px-1"
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
            <SongCard isCurrentSong={false} isFavorite={false} song={song} {...props} />
          </motion.div>
        ))}
      </motion.div>

      {hasMoreSongs && (
        <LoadMoreButton 
          isVisible={hasMoreSongs}
          onClick={handleLoadMore}
          remainingSongs={remainingSongs} isExpanded={false}        />
      )}
    </div>
  );
};

export default SongGrid;