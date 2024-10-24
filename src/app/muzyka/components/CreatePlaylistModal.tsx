import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface CreatePlaylistModalProps {
  onClose: () => void;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  onClose,
  onCreatePlaylist,
  showSuccessToast,
  showErrorToast,
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const validatePlaylistName = (name: string): boolean => {
    if (name.length < 3) {
      setError("Nazwa playlisty musi mieć co najmniej 3 znaki.");
      return false;
    }
    if (name.length > 20) {
      setError("Nazwa playlisty nie może przekraczać 20 znaków.");
      return false;
    }
    if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
      setError(
        "Nazwa playlisty może zawierać tylko litery, cyfry, spacje i myślniki."
      );
      return false;
    }
    if (name.trim().length === 0) {
      setError("Nazwa playlisty nie może składać się tylko z białych znaków.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby tworzyć playlisty.");
      return;
    }
    if (validatePlaylistName(playlistName)) {
      onCreatePlaylist(playlistName.trim());
      showSuccessToast(`Utworzono nową playlistę "${playlistName.trim()}"`);
      onClose();
    } else {
      showErrorToast("Nie udało się utworzyć playlisty. Sprawdź nazwę.");
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
            className="w-full p-2 border border-gray-300 rounded mb-2"
            aria-label="Nazwa playlisty"
            maxLength={50}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
              disabled={!playlistName.trim() || !!error}
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
