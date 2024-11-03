import React from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaPlay,
  FaFire,
  FaList,
  FaClock,
  FaMusic,
  FaPause,
} from "react-icons/fa";
import Image from "next/image";

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
  likedBy?: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

interface Playlist {
  id: string;
  name: string;
  songs: string[];
}

interface PopularSectionsProps {
  topLikedSongs: Song[];
  trendingSongs: Song[];
  topPlaylists: Playlist[];
  songs: Song[];
  isAuthenticated: boolean;
  onPlaySong: (id: string) => void;
  onPlayPlaylist?: (id: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
  showErrorToast: (message: string) => void;
}

interface SongCardProps {
  song: Song;
  onPlaySong: (id: string) => void;
  isCurrentSong?: boolean;
  isPlaying?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, onPlaySong, isCurrentSong, isPlaying }) => (
  <motion.div
    className="bg-navy-800/30 backdrop-blur-sm rounded-xl p-3 hover:bg-navy-700/40 transition-all cursor-pointer group"
    whileHover={{ scale: 1.02 }}
    onClick={() => onPlaySong(song.id)}
  >
    <div className="relative aspect-square mb-3">
      <Image
        src={song.thumbnail || '/placeholder.jpg'}
        alt={song.title}
        fill
        className="object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
        {isCurrentSong && isPlaying ? (
          <FaPause className="text-white text-4xl" />
        ) : (
          <FaPlay className="text-white text-4xl" />
        )}
      </div>
    </div>
    <h3 className="text-white/90 font-medium truncate text-sm">{song.title}</h3>
    <p className="text-white/60 text-xs truncate mt-0.5">{song.artist}</p>
  </motion.div>
);

const PopularSections: React.FC<PopularSectionsProps> = ({
  topLikedSongs,
  trendingSongs,
  topPlaylists,
  songs,
  onPlaySong,
  onPlayPlaylist,
  currentSongId,
  isPlaying,
  showErrorToast,
}) => {
  return (
    <div className="bg-gradient-to-b from-navy-900 to-navy-950 py-16">
      <div className="container mx-auto px-6">
        <div className="space-y-16">
          {/* Top Lubiane */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <FaHeart className="text-red-500 text-2xl" />
                <h2 className="text-3xl font-bold text-white/90">Top Lubiane</h2>
              </div>
              <button className="text-white/60 hover:text-white/90 transition-colors text-sm">
                Zobacz wszystkie
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {topLikedSongs.map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  onPlaySong={onPlaySong}
                  isCurrentSong={song.id === currentSongId}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </section>

          {/* Popularne Playlisty */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <FaList className="text-blue-400 text-2xl" />
                <h2 className="text-3xl font-bold text-white/90">Popularne Playlisty</h2>
              </div>
              <button className="text-white/60 hover:text-white/90 transition-colors text-sm">
                Zobacz wszystkie
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {topPlaylists.map((playlist) => (
                <PlaylistCard 
                  key={playlist.id} 
                  playlist={playlist}
                  songs={songs}
                  onPlayPlaylist={onPlayPlaylist}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const LikedByAvatars: React.FC<{ likedBy?: Song['likedBy'] }> = ({ likedBy }) => {
  if (!likedBy?.length) return null;

  return (
    <div className="flex -space-x-2 mt-2 overflow-hidden">
      {likedBy.slice(0, 3).map((user) => (
        <div
          key={user.id}
          className="relative inline-block"
          title={user.name}
        >
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={24}
              height={24}
              className="rounded-full border-2 border-[#182338] bg-[#182338]"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs text-white border-2 border-[#182338]">
              {user.name[0]}
            </div>
          )}
        </div>
      ))}
      {likedBy.length > 3 && (
        <div 
          className="w-6 h-6 rounded-full bg-[#182338] border-2 border-[#182338] flex items-center justify-center text-xs text-white"
          title={`i ${likedBy.length - 3} innych`}
        >
          +{likedBy.length - 3}
        </div>
      )}
    </div>
  );
};

interface PlaylistCardProps {
  playlist: Playlist;
  songs: Song[];
  onPlayPlaylist?: (id: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, songs, onPlayPlaylist }) => {
  const playlistSongs = songs.filter(song => playlist.songs.includes(song.id));
  const thumbnails = playlistSongs.slice(0, 4).map(song => song.thumbnail);

  return (
    <motion.div
      className="bg-navy-800 rounded-lg overflow-hidden group hover:bg-navy-700 transition-all"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-square grid grid-cols-2 grid-rows-2 gap-0.5 bg-navy-900">
        {thumbnails.map((thumbnail, index) => (
          <div key={index} className="relative">
            <Image
              src={thumbnail || '/placeholder.jpg'}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-green-500 p-4 rounded-full"
            onClick={() => onPlayPlaylist?.(playlist.id)}
          >
            <FaPlay className="text-white" />
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white truncate">{playlist.name}</h3>
        <p className="text-sm text-gray-400">{playlist.songs.length} utworów</p>
      </div>
    </motion.div>
  );
};

export default PopularSections;
