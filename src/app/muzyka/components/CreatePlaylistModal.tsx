import React, { useState } from "react";

interface CreatePlaylistModalProps {
  onClose: () => void;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  onClose,
  onCreatePlaylist,
}) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playlistName.trim()) {
      onCreatePlaylist(playlistName.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Utwórz nową playlistę</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Nazwa playlisty"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            aria-label="Nazwa playlisty"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Utwórz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
