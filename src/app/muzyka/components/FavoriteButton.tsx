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
      className={`${
        isFavorite
          ? "bg-gradient-to-r from-pink-500 to-purple-500"
          : "bg-gray-300"
      } text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300`}
    >
      <FaHeart className="inline" />
    </button>
  );
};

export default FavoriteButton;
