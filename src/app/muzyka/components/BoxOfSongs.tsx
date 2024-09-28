import React from "react";
import Image from "next/image";
import { Song } from "../types";
import { useDispatch } from 'react-redux';
import { setCurrentSongIndex } from '@/store/slices/features/songsSlice';

interface BoxOfSongsProps {
  songs: Song[];
}

const BoxOfSongs: React.FC<BoxOfSongsProps> = ({ songs }) => {
  const dispatch = useDispatch();

  const handleSongSelect = (index: number) => {
    dispatch(setCurrentSongIndex(index));
  };

  return (
    <div className="mb-8 p-4 border-2 border-blue-500 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Wszystkie piosenki
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {songs.map((song, index) => (
          <div
            key={song._id}
            className="w-20 h-20 relative rounded-lg overflow-hidden border-2 border-purple-300 cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSongSelect(index)}
          >
            <Image
              src={`https://img.youtube.com/vi/${song.youtubeId}/0.jpg`}
              alt={song.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxOfSongs;