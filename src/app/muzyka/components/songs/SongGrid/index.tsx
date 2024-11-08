import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SongCard } from './SongCard';
import { FilterPanel } from './filters/FilterPanel';
import { useFilters } from './filters/hooks/useFilters';
import type { SongGridProps } from './types';

const SongGrid: React.FC<SongGridProps> = ({
  songs,
  currentSongId,
  isPlaying,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
  favorites,
}) => {
  const {
    filters,
    updateFilter,
    clearFilters,
    filteredSongs,
    hasActiveFilters
  } = useFilters(songs);

  return (
    <div className="w-full bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Szybki wybór
        </h2>
        {hasActiveFilters && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500"
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

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
        >
          {filteredSongs.map((song) => (
            <motion.div
              key={song.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <SongCard
                song={song}
                isCurrentSong={song.id === currentSongId}
                isPlaying={isPlaying}
                isFavorite={favorites.has(song.id)}
                onSongSelect={onSongSelect}
                onAddToPlaylist={onAddToPlaylist}
                onToggleFavorite={onToggleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SongGrid;