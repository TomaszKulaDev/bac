import React, { useState } from 'react';
import { FaMusic, FaUser, FaYoutube } from 'react-icons/fa';

interface AddSongFormProps {
  onAddSong: (song: { title: string; artist: string; youtubeId: string }) => void;
}

const extractYoutubeId = (url: string): string | null => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/)?([a-zA-Z0-9_-]{11})(\S*)?$/);
  return match ? match[1] : null;
};

const AddSongForm: React.FC<AddSongFormProps> = ({ onAddSong }) => {
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    youtubeId: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    artist: '',
    youtubeId: '',
    submit: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', artist: '', youtubeId: '', submit: '' };

    if (!newSong.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
      isValid = false;
    }
    if (!newSong.artist.trim()) {
      newErrors.artist = 'Artysta jest wymagany';
      isValid = false;
    }
    if (!newSong.youtubeId.trim()) {
      newErrors.youtubeId = 'Link do YouTube jest wymagany';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/submit-song", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newSong.title,
            artist: newSong.artist,
            youtubeId: newSong.youtubeId,
            userId: "admin"
          }),
        });

        const data = await response.json();

        if (response.ok) {
          onAddSong(data.song);
          setNewSong({ title: "", artist: "", youtubeId: "" });
          setErrors({ title: '', artist: '', youtubeId: '', submit: '' });
        } else {
          console.error("Błąd podczas dodawania utworu:", data);
          setErrors(prev => ({ ...prev, submit: data.message || "Wystąpił błąd podczas dodawania utworu" }));
        }
      } catch (error) {
        console.error("Błąd podczas dodawania utworu:", error);
        setErrors(prev => ({ ...prev, submit: "Wystąpił błąd podczas dodawania utworu" }));
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dodaj nową piosenkę</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Tytuł
          </label>
          <div className="relative">
            <FaMusic className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="title"
              type="text"
              placeholder="Np. Bohemian Rhapsody"
              value={newSong.title}
              onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-label="Tytuł piosenki"
            />
          </div>
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">
            Artysta
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="artist"
              type="text"
              placeholder="Np. Queen"
              value={newSong.artist}
              onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-label="Nazwa artysty"
            />
          </div>
          {errors.artist && <p className="text-red-500 text-xs mt-1">{errors.artist}</p>}
        </div>
        <div>
          <label htmlFor="youtubeId" className="block text-sm font-medium text-gray-700 mb-1">
            YouTube ID
          </label>
          <div className="relative">
            <FaYoutube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="youtubeId"
              type="text"
              placeholder="Np. dQw4w9WgXcQ"
              value={newSong.youtubeId}
              onChange={(e) => {
                const input = e.target.value;
                setNewSong({ ...newSong, youtubeId: input });
              }}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-label="YouTube ID"
              title="ID filmu YouTube (11 znaków po 'v=' w adresie URL)"
            />
          </div>
          {errors.youtubeId && <p className="text-red-500 text-xs mt-1">{errors.youtubeId}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300"
        >
          Dodaj piosenkę
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;