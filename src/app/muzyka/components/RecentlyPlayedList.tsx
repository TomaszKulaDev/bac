import React from 'react';
import { Song } from '../types';

interface RecentlyPlayedListProps {
  songs: Song[];
}

const RecentlyPlayedList: React.FC<RecentlyPlayedListProps> = ({ songs }) => {
  return (
    <div>
      <h3>Ostatnio odtworzone</h3>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayedList;
