import React, { useState } from 'react';
import { FaMusic, FaUser, FaYoutube } from 'react-icons/fa';

interface AddSongFormProps {
  onAddSong: (song: { title: string; artist: string; youtubeLink: string }) => void;
}

const AddSongForm: React.FC<AddSongFormProps> = ({ onAddSong }) => {
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    youtubeLink: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    artist: '',
    youtubeLink: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', artist: '', youtubeLink: '' };

    if (!newSong.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
      isValid = false;
    }
    if (!newSong.artist.trim()) {
      newErrors.artist = 'Artysta jest wymagany';
      isValid = false;
    }
    if (!newSong.youtubeLink.trim()) {
      newErrors.youtubeLink = 'Link do YouTube jest wymagany';
      isValid = false;
    } else if (!/^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/.test(newSong.youtubeLink)) {
      newErrors.youtubeLink = 'Nieprawidłowy format linku do YouTube';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddSong(newSong);
      setNewSong({ title: '', artist: '', youtubeLink: '' });
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
          <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700 mb-1">
            Link do YouTube
          </label>
          <div className="relative">
            <FaYoutube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="youtubeLink"
              type="text"
              placeholder="Np. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={newSong.youtubeLink}
              onChange={(e) => setNewSong({ ...newSong, youtubeLink: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-label="Link do YouTube"
              title="Pełny link do filmu YouTube"
            />
          </div>
          {errors.youtubeLink && <p className="text-red-500 text-xs mt-1">{errors.youtubeLink}</p>}
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