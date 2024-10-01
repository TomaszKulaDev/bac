import React from 'react';
import { Song } from '../types';

interface SimilarSongsProps {
  currentSong: Song | null;
}

const SimilarSongs: React.FC<SimilarSongsProps> = ({ currentSong }) => {
  if (!currentSong) {
    return null; // lub możesz zwrócić jakiś placeholder, np. <div>Wybierz piosenkę, aby zobaczyć podobne</div>
  }

  return (
    <div>
      <h3>Podobne do: {currentSong.title}</h3>
      {/* Tu dodaj logikę wyświetlania podobnych piosenek */}
    </div>
  );
};

export default SimilarSongs;
