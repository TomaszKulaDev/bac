import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Z_INDEX } from "@/app/constants/zIndex";
import { FaMusic, FaTimes, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { validatePlaylistTitle } from "../utils/validation";

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
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Nowa funkcja do walidacji w czasie rzeczywistym
  const validateOnChange = (name: string) => {
    if (name.length > 0 && name.length < 3) {
      setError("Nazwa playlisty musi mieć co najmniej 3 znaki.");
    } else if (name.length > 20) {
      setError("Nazwa playlisty nie może przekraczać 20 znaków.");
    } else if (name.length > 0 && !/^[a-zA-Z0-9\s-]+$/.test(name)) {
      setError(
        "Nazwa playlisty może zawierać tylko litery, cyfry, spacje i myślniki."
      );
    } else {
      setError(null);
    }
  };

  // Obsługa zmiany wartości input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPlaylistName(newValue);
    validateOnChange(newValue);
  };

  // Walidacja przed wysłaniem
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
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby tworzyć playlisty.");
      setIsLoading(false);
      return;
    }

    if (validatePlaylistName(playlistName)) {
      try {
        onCreatePlaylist(playlistName.trim());
        showSuccessToast(`Utworzono nową playlistę "${playlistName.trim()}"`);
        onClose();
      } catch (error) {
        showErrorToast("Nie udało się utworzyć playlisty. Spróbuj ponownie.");
      }
    } else {
      showErrorToast("Nie udało się utworzyć playlisty. Sprawdź nazwę.");
    }
    setIsLoading(false);
  };

  const handleCreatePlaylist = () => {
    const validation = validatePlaylistTitle(playlistName);

    if (!validation.isValid) {
      setError(validation.error || "");
      showErrorToast(validation.error || "");
      return;
    }

    onCreatePlaylist(playlistName);
    setPlaylistName("");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md bg-gradient-to-b from-zinc-900 to-zinc-950 
                 rounded-2xl shadow-2xl border border-zinc-800"
      >
        {/* Nagłówek */}
        <div className="relative p-6 flex items-center justify-center">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white 
                       hover:bg-zinc-800/50 rounded-full transition-all"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-gradient-to-tr 
                          from-blue-500 to-purple-600 mb-3">
              <FaMusic className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Stwórz nową playlistę
            </h2>
          </div>
        </div>

        {/* Formularz */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
                validateOnChange(e.target.value);
              }}
              placeholder="Nazwa playlisty"
              className="w-full px-4 py-3.5 bg-zinc-800/50 
                       border-2 border-zinc-700/50 rounded-xl text-white 
                       placeholder-zinc-500 focus:outline-none 
                       focus:border-blue-500/50 focus:bg-zinc-800/80
                       transition-all duration-200"
              maxLength={50}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm flex items-center"
                >
                  <span className="mr-2">⚠️</span> {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Przyciski */}
          <div className="flex flex-col gap-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || !playlistName.trim() || !!error}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 
                       text-white py-3.5 px-4 rounded-xl font-medium
                       hover:from-blue-600 hover:to-purple-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-blue-500/20
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white 
                                rounded-full animate-spin" />
                  <span>Tworzenie...</span>
                </div>
              ) : (
                <>
                  <FaPlus className="text-lg" />
                  <span>Utwórz playlistę</span>
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xl font-medium
                       text-zinc-400 hover:text-white hover:bg-zinc-800/50
                       transition-all duration-200"
            >
              Anuluj
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePlaylistModal;
