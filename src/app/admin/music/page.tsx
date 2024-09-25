"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddSongForm from "./components/AddSongForm";
import { RootState } from "@/store/store";
import { fetchSongs, addSong, deleteSong, setSongs } from "@/store/slices/features/songsSlice";
import { Song } from "@/app/muzyka/types";
import { AppDispatch } from "@/store/store";

const AdminMusicPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const status = useSelector((state: RootState) => state.songs.status);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleAddSong = async (newSong: Omit<Song, "id" | "votes" | "score" | "isFavorite" | "userVote">) => {
    try {
      await dispatch(addSong(newSong)).unwrap();
      dispatch(fetchSongs());
    } catch (error) {
      console.error("Błąd podczas dodawania utworu:", error);
    }
  };

  const handleDeleteSong = async (id: string) => {
    try {
      await dispatch(deleteSong(id)).unwrap();
    } catch (error) {
      console.error("Błąd podczas usuwania utworu:", error);
    }
  };

  const refreshSongs = () => {
    dispatch(fetchSongs());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Zarządzanie Muzyką
      </h1>

      <AddSongForm onAddSong={refreshSongs} />

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
