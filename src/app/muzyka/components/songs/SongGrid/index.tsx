import React from 'react';
import { SongCard } from './SongCard';
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
  return (
    <div className="w-full bg-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Szybki wybór
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {songs.map((song) => (
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
    </div>
  );
};

export default SongGrid;