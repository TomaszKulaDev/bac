import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Z_INDEX } from '@/app/constants/zIndex';
import { FaMusic, FaTimes, FaPlus } from 'react-icons/fa';
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { validatePlaylistTitle } from '../utils/validation';

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
  const [validationError, setValidationError] = useState<string>('');

  // Nowa funkcja do walidacji w czasie rzeczywistym
  const validateOnChange = (name: string) => {
    if (name.length > 0 && name.length < 3) {
      setError("Nazwa playlisty musi mieć co najmniej 3 znaki.");
    } else if (name.length > 20) {
      setError("Nazwa playlisty nie może przekraczać 20 znaków.");
    } else if (name.length > 0 && !/^[a-zA-Z0-9\s-]+$/.test(name)) {
      setError("Nazwa playlisty może zawierać tylko litery, cyfry, spacje i myślniki.");
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
      setError("Nazwa playlisty może zawierać tylko litery, cyfry, spacje i myślniki.");
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
      setValidationError(validation.error || '');
      showErrorToast(validation.error || '');
      return;
    }

    onCreatePlaylist(playlistName);
    setPlaylistName('');
    setValidationError('');
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ zIndex: Z_INDEX.MODAL_OVERLAY }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-[#0a1e3b] p-6 rounded-2xl shadow-2xl border border-white/10"
        style={{ zIndex: Z_INDEX.MODAL }}
      >
        {/* Nagłówek */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-xl">
              <FaMusic className="text-[#0a1e3b] text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Nowa playlista</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 mb-2 font-medium">
              Nazwa playlisty
            </label>
            <input
              type="text"
              value={playlistName}
              onChange={handleInputChange}
              placeholder="Np. Moje ulubione bachaty"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white 
                placeholder-white/50 focus:outline-none focus:border-yellow-400/50 transition-colors"
              maxLength={50}
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-red-400 text-sm flex items-center"
              >
                <span className="mr-1">⚠️</span> {error}
              </motion.p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || !playlistName.trim() || !!error}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-3 px-4 
                rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-700 
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Tworzenie...</span>
                </>
              ) : (
                <>
                  <FaPlus className="w-5 h-5" />
                  <span>Utwórz playlistę</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/5 text-white py-3 px-4 rounded-lg font-medium 
                hover:bg-white/10 transition-all duration-200"
            >
              Anuluj
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePlaylistModal;
