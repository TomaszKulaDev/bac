import React, { useState, useCallback } from "react";
import { Song } from "../types";

interface CreatePlaylistProps {
  songs: Song[];
  onCreatePlaylist: (name: string, selectedSongs: string[]) => void;
  existingPlaylists: { id: string; name: string }[];
  onAddToExistingPlaylist: (playlistId: string, selectedSongs: string[]) => void;
}

interface SongItemProps {
  song: Song;
  isSelected: boolean;
  onToggle: (songId: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, isSelected, onToggle }) => {
  const songId = song._id || song.id;
  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(songId)}
        className="form-checkbox h-5 w-5 text-purple-600"
      />
      <span>{song.title}</span>
    </div>
  );
};


const CreatePlaylist: React.FC<CreatePlaylistProps> = ({
  songs,
  onCreatePlaylist,
  existingPlaylists,
  onAddToExistingPlaylist
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  console.log("Songs in CreatePlaylist:", songs.map(song => ({ id: song.id, _id: song._id })));
  console.log("Selected songs:", Array.from(selectedSongs));

  console.log("Unique song IDs:", new Set(songs.map(song => song._id)).size);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSongIds = Array.from(selectedSongs);
    if (selectedPlaylist) {
      onAddToExistingPlaylist(selectedPlaylist, selectedSongIds);
    } else if (playlistName.trim() && selectedSongIds.length > 0) {
      onCreatePlaylist(playlistName, selectedSongIds);
    }
    setPlaylistName("");
    setSelectedSongs(new Set());
    setSelectedPlaylist("");
  };

  const toggleSongSelection = useCallback((songId: string) => {
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  }, []);

  const handleAddToPlaylist = () => {
    console.log("Dodawanie piosenek do playlisty:", selectedPlaylist, Array.from(selectedSongs));
    onAddToExistingPlaylist(selectedPlaylist, Array.from(selectedSongs));
    setSelectedSongs(new Set());
    setSelectedPlaylist('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playlist-select" className="block text-sm font-medium text-gray-700 mb-1">
            Wybierz playlistę lub utwórz nową
          </label>
          <select
            id="playlist-select"
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Utwórz nową playlistę</option>
            {Array.isArray(existingPlaylists) && existingPlaylists.map(playlist => (
              <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
            ))}
          </select>
        </div>
        {!selectedPlaylist && (
          <div>
            <label htmlFor="playlist-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa nowej playlisty
            </label>
            <input
              id="playlist-name"
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Wpisz nazwę playlisty"
              className="w-full p-2 border rounded"
              required={!selectedPlaylist}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wybierz utwory do dodania
          </label>
          <div className="max-h-60 overflow-y-auto border rounded p-2">
            {songs.map((song) => {
              const songId = song._id || song.id;
              return (
                <SongItem
                  key={songId}
                  song={song}
                  isSelected={selectedSongs.has(songId)}
                  onToggle={toggleSongSelection}
                />
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition duration-300"
          disabled={
            (!selectedPlaylist && !playlistName.trim()) ||
            Array.from(selectedSongs).filter(Boolean).length === 0
          }
        >
          {selectedPlaylist ? 'Dodaj do playlisty' : 'Utwórz playlistę'}
        </button>
      </form>
    </div>
  );
};


export default CreatePlaylist;