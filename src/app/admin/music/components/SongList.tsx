import React from "react";
import { Song } from "@/app/muzyka/types";

interface SongListProps {
  songs: Song[];
  onDelete: (id: string) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onDelete }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lista utworów</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-1 px-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Nr</th>
            <th className="py-1 px-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Tytuł</th>
            <th className="py-1 px-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Artysta</th>
            <th className="py-1 px-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">YouTube ID</th>
            <th className="py-1 px-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Akcje</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {songs.map((song, index) => (
            <tr key={song.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
              <td className="py-2 px-2 text-sm text-gray-900">{index + 1}</td>
              <td className="py-2 px-2 text-sm text-gray-900">{song.title}</td>
              <td className="py-2 px-2 text-sm text-gray-900">{song.artist}</td>
              <td className="py-2 px-2 text-sm text-gray-900">{song.youtubeId}</td>
              <td className="py-2 px-2 text-sm text-gray-900">
                <button
                  onClick={() => onDelete(song.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
