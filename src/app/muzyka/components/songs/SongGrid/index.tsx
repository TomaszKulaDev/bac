import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SongCard } from './SongCard';
import { FilterPanel } from './filters/FilterPanel';
import { useFilters } from './filters/hooks/useFilters';
import type { SongGridProps } from './types';
import LoadMoreButton from '../LoadMoreButton';

const SongGrid: React.FC<SongGridProps> = ({ songs, ...props }) => {
  const { filters, updateFilter, clearFilters, filteredSongs, hasActiveFilters } = useFilters(songs);
  const [visibleSongs, setVisibleSongs] = useState<number>(24);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentSongs = useMemo(() => 
    filteredSongs.slice(0, visibleSongs),
    [filteredSongs, visibleSongs]
  );

  const hasMoreSongs = filteredSongs.length > 24;
  const remainingSongs = isExpanded ? 0 : filteredSongs.length - visibleSongs;

  const handleToggleVisibility = useCallback(() => {
    if (isExpanded) {
      setVisibleSongs(24);
      setIsExpanded(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      setVisibleSongs(filteredSongs.length);
      setIsExpanded(true);
    }
  }, [isExpanded, filteredSongs.length]);

  return (
    <div className="w-full bg-black p-1 pb-32">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="text-[22px] font-bold text-white">
          Szybki wybór
        </h2>
        {hasActiveFilters && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-[#a7a7a7]"
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
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-4 px-6"
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
        <div className="w-full pt-8 mb-24 px-6">
          <LoadMoreButton 
            isVisible={hasMoreSongs}
            onClick={handleToggleVisibility}
            remainingSongs={remainingSongs}
            isExpanded={isExpanded}
          />
        </div>
      )}
    </div>
  );
};

export default SongGrid;