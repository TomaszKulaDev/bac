import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPlay, FaChartLine, FaUsers, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';
import Image from 'next/image';
import { TopChartsSection } from '../../types/charts';

interface TopChartsProps {
  data: TopChartsSection;
  onPlaySong: (id: string) => void;
  onPlayPlaylist: (id: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
}

const TopCharts: React.FC<TopChartsProps> = ({ data, onPlaySong, onPlayPlaylist }) => {
  return (
    <div className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-12">
          {/* Top 10 Utworów */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaChartLine className="text-2xl text-purple-500" />
                <h2 className="text-2xl font-bold">Top 10 Utworów</h2>
              </div>
              <span className="text-sm text-gray-400">Aktualizowane co tydzień</span>
            </div>
            
            <div className="grid gap-4">
              {data.topLikedSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  className="bg-[#282828] p-4 rounded-lg flex items-center gap-4 group hover:bg-[#333333] transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-2xl font-bold text-gray-400 w-8">{index + 1}</span>
                  <Image
                    src={song.thumbnail}
                    alt={song.title}
                    width={56}
                    height={56}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{song.title}</h3>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <FaHeart className="text-red-500" />
                      <span>{song.likesCount.toLocaleString()}</span>
                    </div>
                    {song.trend === 'up' && <FaArrowUp className="text-green-500" />}
                    {song.trend === 'down' && <FaArrowDown className="text-red-500" />}
                    {song.trend === 'stable' && <FaMinus className="text-gray-500" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Top Playlisty */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaUsers className="text-2xl text-blue-500" />
                <h2 className="text-2xl font-bold">Popularne Playlisty</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.topPlaylists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  className="bg-[#282828] rounded-lg overflow-hidden group hover:bg-[#333333] transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={playlist.thumbnail}
                      alt={playlist.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-green-500 p-4 rounded-full"
                        onClick={() => onPlayPlaylist(playlist.id)}
                      >
                        <FaPlay className="text-white" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold truncate">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      Utworzona przez {playlist.createdBy.name}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span>{playlist.songsCount} utworów</span>
                      <span>{playlist.followers} obserwujących</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TopCharts;