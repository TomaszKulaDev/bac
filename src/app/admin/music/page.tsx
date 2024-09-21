"use client";

import React, { useState } from "react";

const AdminMusicPage = () => {
  const [songs, setSongs] = useState([
    {
      id: "1",
      title: "Hey Mama",
      artist: "David Guetta",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "2",
      title: "To Binge",
      artist: "Gorillaz",
      youtubeId: "dQw4w9WgXcQ",
    },
  ]);

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    youtubeId: "",
  });

  const addSong = () => {
    setSongs([...songs, { id: Date.now().toString(), ...newSong }]);
    setNewSong({ title: "", artist: "", youtubeId: "" });
  };

  const deleteSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Zarządzanie Muzyką
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Dodaj nową piosenkę</h2>
        <input
          type="text"
          placeholder="Tytuł"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Artysta"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="YouTube ID"
          value={newSong.youtubeId}
          onChange={(e) =>
            setNewSong({ ...newSong, youtubeId: e.target.value })
          }
          className="mr-2 p-2 border rounded"
        />
        <button
          onClick={addSong}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Dodaj
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Lista piosenek</h2>
        {songs.map((song) => (
          <div key={song.id} className="mb-2">
            <span>
              {song.title} - {song.artist}
            </span>
            <button
              onClick={() => deleteSong(song.id)}
              className="ml-2 bg-red-500 text-white p-1 rounded"
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMusicPage;
