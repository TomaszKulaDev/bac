import React, { useState } from 'react';
import { FaMusic, FaUser, FaYoutube } from 'react-icons/fa';

interface AddSongFormProps {
  onAddSong: (song: { title: string; artist: string; youtubeId: string }) => void;
}

const extractYoutubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
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
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', artist: '', youtubeId: '' };

    if (!newSong.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
      isValid = false;
    }
    if (!newSong.artist.trim()) {
      newErrors.artist = 'Artysta jest wymagany';
      isValid = false;
    }
    if (!newSong.youtubeId.trim()) {
      newErrors.youtubeId = 'YouTube ID jest wymagane';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_-]{11}$/.test(newSong.youtubeId)) {
      const extractedId = extractYoutubeId(newSong.youtubeId);
      if (extractedId) {
        setNewSong(prev => ({ ...prev, youtubeId: extractedId }));
      } else {
        newErrors.youtubeId = 'Nieprawidłowy format YouTube ID lub linku';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddSong(newSong);
      setNewSong({ title: '', artist: '', youtubeId: '' });
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
                const youtubeId = extractYoutubeId(input);
                setNewSong({ ...newSong, youtubeId: youtubeId || input });
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