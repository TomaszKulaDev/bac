"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddSongForm from "./components/AddSongForm";
import { RootState } from "@/store/store";
import { addSong, deleteSong, setSongs } from "@/store/slices/features/songsSlice";
import { Song as SongModel } from '@/models/Song';
import { Song } from '@/app/muzyka/types';
import { connectToDatabase } from '@/lib/mongodb';

const AdminMusicPage = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    const fetchSongs = async () => {
      console.log("AdminMusicPage fetchSongs: Start");
      if (songs.length === 0) {
        try {
          await connectToDatabase();
          console.log("AdminMusicPage fetchSongs: Connected to database");
          const response = await fetch('/api/songs');
          const fetchedSongs = await response.json();
          console.log("AdminMusicPage fetchSongs: Songs fetched", fetchedSongs);
          const formattedSongs: Song[] = fetchedSongs.map((song: any) => ({
            id: song._id.toString(),
            title: song.title,
            artist: song.artist,
            youtubeId: song.youtubeId,
            votes: song.votes,
            score: song.score,
            isFavorite: song.isFavorite,
            userVote: null,
          }));
          dispatch(setSongs(formattedSongs));
        } catch (error) {
          console.error("AdminMusicPage fetchSongs: Błąd podczas pobierania piosenek:", error);
        }
      }
    };

    fetchSongs();
  }, [dispatch, songs.length]);

  const handleAddSong = async (newSong: { title: string; artist: string; youtubeId: string }) => {
    const song: Song = {
      id: '', // Możesz wygenerować unikalne ID tutaj
      title: newSong.title,
      artist: newSong.artist,
      youtubeId: newSong.youtubeId,
      votes: 0,
      score: 0,
      isFavorite: false,
      userVote: null,
    };

    const songForApi = {
      title: newSong.title,
      artist: newSong.artist,
      youtubeLink: `https://www.youtube.com/watch?v=${newSong.youtubeId}`,
      userId: 'someUserId', // Dodaj odpowiedni userId, jeśli jest wymagany
    };

    console.log("Dodawanie piosenki:", songForApi);

    try {
      const response = await fetch('/api/submit-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songForApi),
      });

      if (response.ok) {
        dispatch(addSong(song));
      } else {
        const errorData = await response.json();
        console.error('Błąd podczas dodawania piosenki:', errorData);
      }
    } catch (error) {
      console.error('Błąd podczas dodawania piosenki:', error);
    }
  };

  return (
    <div>
      <h1>Admin Music Page</h1>
      <AddSongForm onAddSong={handleAddSong} />
    </div>
  );
};

export default AdminMusicPage;
