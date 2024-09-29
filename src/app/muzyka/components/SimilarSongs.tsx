import React from 'react';
import { Song } from '../types';

interface SimilarSongsProps {
  currentSong: Song;
}

const SimilarSongs: React.FC<SimilarSongsProps> = ({ currentSong }) => {
  return (
    <div>
      <h3>Podobne do: {currentSong.title}</h3>
      {/* Tu dodaj logikę wyświetlania podobnych piosenek */}
    </div>
  );
};

export default SimilarSongs;
