import React from 'react';
import { Song } from '../types';

interface CreatePlaylistProps {
  songs: Song[];
}

const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ songs }) => {
  return (
    <div>
      <h3>Utwórz playlistę</h3>
      {/* Tu dodaj formularz do tworzenia playlisty */}
    </div>
  );
};

export default CreatePlaylist;
