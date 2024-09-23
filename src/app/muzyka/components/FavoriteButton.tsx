import React from "react";
import { FaHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  songId: string;
  isFavorite: boolean;
  isLoggedIn: boolean;
  onToggleFavorite: (songId: string) => void;
  onShowLoginModal: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  songId,
  isFavorite,
  isLoggedIn,
  onToggleFavorite,
  onShowLoginModal,
}) => {
  const handleClick = () => {
    if (isLoggedIn) {
      onToggleFavorite(songId);
    } else {
      onShowLoginModal();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-16 h-16 
        bg-gradient-to-r from-purple-500 to-pink-500 
        text-white 
        rounded-full 
        shadow-lg 
        hover:from-purple-600 hover:to-pink-600 
        hover:shadow-xl
        transition-all duration-300 
        flex items-center justify-center 
        transform hover:scale-110 hover:rotate-12
        ${isFavorite ? 'ring-4 ring-pink-300 ring-opacity-50' : ''}
      `}
    >
      <FaHeart 
        className={`text-2xl 
          ${isFavorite ? 'text-white' : 'text-purple-200'}
          transition-colors duration-300
        `} 
      />
    </button>
  );
};

export default FavoriteButton;
