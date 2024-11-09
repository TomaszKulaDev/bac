import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SongCard } from './SongCard';
import { FilterPanel } from './filters/FilterPanel';
import { useFilters } from './filters/hooks/useFilters';
import type { SongGridProps } from './types';

const SongGrid: React.FC<SongGridProps> = ({ songs, ...props }) => {
  const { filters, updateFilter, clearFilters, filteredSongs, hasActiveFilters } = useFilters(songs);

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
        {filteredSongs.map((song) => (
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
              {...props}
              isCurrentSong={song.id === props.currentSongId}
              isFavorite={props.favorites.has(song.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SongGrid;