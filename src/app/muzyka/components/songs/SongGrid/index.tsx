import React from 'react';
import { SongCard } from './SongCard';
import { FilterPanel } from '../filters/FilterPanel';
import { useFilters } from '../filters/FilterContext';
import { useFilteredSongs } from './hooks/useFilteredSongs';
import type { SongGridProps } from './types';
import SearchInput from '../SearchInput';

const SongGrid: React.FC<SongGridProps> = ({
  songs,
  currentSongId,
  isPlaying,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
  favorites,
}) => {
  const { filters, setFilters } = useFilters();
  const filteredSongs = useFilteredSongs(songs, filters);

  const handleSearchChange = (value: string) => {
    setFilters({ searchQuery: value });
  };

  return (
    <div className="w-full bg-white p-6">
      <div className="mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Szybki wybór
        </h2>
        <SearchInput 
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
        <FilterPanel />
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isCurrentSong={song.id === currentSongId}
            isPlaying={isPlaying}
            isFavorite={favorites.has(song.id)}
            onSongSelect={onSongSelect}
            onAddToPlaylist={onAddToPlaylist}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
      
      {filteredSongs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nie znaleziono utworów spełniających kryteria wyszukiwania
        </div>
      )}
    </div>
  );
};

export default SongGrid;