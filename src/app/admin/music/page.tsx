"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddSongForm from "./components/AddSongForm";
import { RootState } from "@/store/store";
import { addSong, deleteSong } from "@/store/slices/features/songsSlice";
import { Song } from "@/app/muzyka/types";

const AdminMusicPage = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("Aktualny stan piosenek:", songs);
  }, [songs]);

  const handleAddSong = (
    newSong: Omit<Song, "id" | "votes" | "score" | "isFavorite" | "userVote">
  ) => {
    const songToAdd: Song = {
      ...newSong,
      id: Date.now().toString(),
      votes: 0,
      score: 0,
      isFavorite: false,
      userVote: null,
    };
    dispatch(addSong(songToAdd));
  };

  const handleDeleteSong = (id: string) => {
    dispatch(deleteSong(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Zarządzanie Muzyką
      </h1>

      <AddSongForm onAddSong={handleAddSong} />

      <div>
        <h2 className="text-2xl font-bold mb-4">Lista piosenek</h2>
        {songs.map((song) => (
          <div
            key={song.id}
            className="mb-2 flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <span>
              {song.title} - {song.artist}
            </span>
            <button
              onClick={() => handleDeleteSong(song.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
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
