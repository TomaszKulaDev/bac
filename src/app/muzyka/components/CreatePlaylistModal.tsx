import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Z_INDEX } from "@/app/constants/zIndex";
import { FaMusic, FaTimes, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { validatePlaylistTitle } from "../utils/validation";
import { initial } from "lodash";

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
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-md 
            mx-auto overflow-y-auto max-h-[90vh]"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Stwórz nową playlistę
          </h3>

          <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-amber-800 text-sm leading-relaxed">
              Stwórz własną playlistę i zachowaj ulubione utwory w jednym
              miejscu. Możesz później edytować jej zawartość.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nazwa playlisty
              </label>
              <input
                type="text"
                value={playlistName}
                onChange={handleInputChange}
                placeholder="Nazwa playlisty"
                className={`w-full px-4 py-3.5 bg-white border-2 border-gray-200 
                  rounded-xl text-gray-800 placeholder-gray-400
                  focus:outline-none focus:border-amber-500/50 
                  focus:ring-2 focus:ring-amber-500/30
                  transition-all duration-200
                  ${error ? "border-red-400 focus:border-red-400" : ""}`}
                maxLength={50}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <span className="mr-2">●</span>
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || !playlistName.trim() || !!error}
                className="w-full bg-amber-500 text-white py-3.5 rounded-xl
                  font-medium hover:bg-amber-600 disabled:opacity-50 
                  disabled:cursor-not-allowed transition-colors
                  flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 border-2 border-white/20 
                      border-t-white rounded-full animate-spin"
                    />
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
                className="w-full py-3.5 rounded-xl font-medium
                  text-gray-600 hover:text-gray-800 
                  hover:bg-gray-50 transition-colors"
              >
                Anuluj
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreatePlaylistModal;
