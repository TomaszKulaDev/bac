import React, { useState } from "react";
import { FaMusic, FaUser, FaYoutube } from "react-icons/fa";

interface AddSongFormProps {
  onAddSong: (song: {
    title: string;
    artist: string;
    youtubeLink: string;
    impro: boolean;
    beginnerFriendly: boolean;
    sensual: boolean;
    dominicana: boolean;
    intermediate: boolean;
    advanced: boolean;
    slow: boolean;
    medium: boolean;
    fast: boolean;
  }) => void;
}

const AddSongForm: React.FC<AddSongFormProps> = ({ onAddSong }) => {
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    youtubeLink: "",
    impro: false,
    beginnerFriendly: false,
    sensual: false,
    dominicana: false,
    intermediate: false,
    advanced: false,
    slow: false,
    medium: false,
    fast: false,
  });
  const [errors, setErrors] = useState({
    title: "",
    artist: "",
    youtubeLink: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: "", artist: "", youtubeLink: "" };

    if (!newSong.title.trim()) {
      newErrors.title = "Tytuł jest wymagany";
      isValid = false;
    }
    if (!newSong.artist.trim()) {
      newErrors.artist = "Artysta jest wymagany";
      isValid = false;
    }
    if (!newSong.youtubeLink.trim()) {
      newErrors.youtubeLink = "Link do YouTube jest wymagany";
      isValid = false;
    } else if (
      !/^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/.test(
        newSong.youtubeLink
      )
    ) {
      newErrors.youtubeLink = "Nieprawidłowy format linku do YouTube";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddSong(newSong);
      setNewSong({
        title: "",
        artist: "",
        youtubeLink: "",
        impro: false,
        beginnerFriendly: false,
        sensual: false,
        dominicana: false,
        intermediate: false,
        advanced: false,
        slow: false,
        medium: false,
        fast: false,
      });
    }
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Dodaj nową piosenkę
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tytuł
          </label>
          <div className="relative">
            <FaMusic className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              id="title"
              type="text"
              placeholder="Np. Bohemian Rhapsody"
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
              aria-label="Tytuł piosenki"
            />
          </div>
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="artist"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Artysta
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              id="artist"
              type="text"
              placeholder="Np. Queen"
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
              aria-label="Nazwa artysty"
            />
          </div>
          {errors.artist && (
            <p className="text-red-500 text-xs mt-1">{errors.artist}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="youtubeLink"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Link do YouTube
          </label>
          <div className="relative">
            <FaYoutube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              id="youtubeLink"
              type="text"
              placeholder="Np. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={newSong.youtubeLink}
              onChange={(e) =>
                setNewSong({ ...newSong, youtubeLink: e.target.value })
              }
              className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
              aria-label="Link do YouTube"
              title="Pełny link do filmu YouTube"
            />
          </div>
          {errors.youtubeLink && (
            <p className="text-red-500 text-xs mt-1">{errors.youtubeLink}</p>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
              Styl tańca
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center">
                <input
                  id="impro"
                  type="checkbox"
                  checked={newSong.impro}
                  onChange={(e) =>
                    setNewSong({ ...newSong, impro: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="impro"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Impro
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sensual"
                  type="checkbox"
                  checked={newSong.sensual}
                  onChange={(e) =>
                    setNewSong({ ...newSong, sensual: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="sensual"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Sensual
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="dominicana"
                  type="checkbox"
                  checked={newSong.dominicana}
                  onChange={(e) =>
                    setNewSong({ ...newSong, dominicana: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="dominicana"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Dominicana
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
              Poziom zaawansowania
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center">
                <input
                  id="beginnerFriendly"
                  type="checkbox"
                  checked={newSong.beginnerFriendly}
                  onChange={(e) =>
                    setNewSong({
                      ...newSong,
                      beginnerFriendly: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="beginnerFriendly"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Początkujący
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="intermediate"
                  type="checkbox"
                  checked={newSong.intermediate}
                  onChange={(e) =>
                    setNewSong({ ...newSong, intermediate: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="intermediate"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Średniozaawansowany
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="advanced"
                  type="checkbox"
                  checked={newSong.advanced}
                  onChange={(e) =>
                    setNewSong({ ...newSong, advanced: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="zaawansowany"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Zaawansowany
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
              Tempo muzyki
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center">
                <input
                  id="slow"
                  type="checkbox"
                  checked={newSong.slow}
                  onChange={(e) =>
                    setNewSong({ ...newSong, slow: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="slow"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Wolne
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="medium"
                  type="checkbox"
                  checked={newSong.medium}
                  onChange={(e) =>
                    setNewSong({ ...newSong, medium: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="medium"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Średnie
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="fast"
                  type="checkbox"
                  checked={newSong.fast}
                  onChange={(e) =>
                    setNewSong({ ...newSong, fast: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="fast"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Szybkie
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 mt-6"
        >
          Dodaj piosenkę
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;
