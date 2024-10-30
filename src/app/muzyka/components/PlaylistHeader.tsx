import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { Playlist } from '../types';

interface PlaylistHeaderProps {
  playlist: Playlist;
  onPlay: (id: string) => void;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist, onPlay }) => {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onPlay(playlist.id)} className="text-[#2a4a7f]">
        <FaPlay />
      </button>
      <span className="font-medium">{playlist.name}</span>
    </div>
  );
};

export default PlaylistHeader;
