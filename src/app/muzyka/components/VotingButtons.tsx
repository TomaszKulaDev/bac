import React from "react";
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import FavoriteButton from "./FavoriteButton";

interface VotingButtonsProps {
  songId: string;
  votes: number;
  isFavorite: boolean;
  isLoggedIn: boolean;
  userVote: 'up' | 'down' | null;
  onVote: (songId: string, voteType: 'up' | 'down' | null) => void;
  onToggleFavorite: (songId: string) => void;
  onShowLoginModal: () => void;
}

const VotingButtons: React.FC<VotingButtonsProps> = ({
  songId,
  votes,
  isFavorite,
  isLoggedIn,
  userVote,
  onVote,
  onToggleFavorite,
  onShowLoginModal,
}) => {
  const handleVote = (voteType: 'up' | 'down') => {
    if (isLoggedIn) {
      if (userVote === voteType) {
        // Cofnij głos
        onVote(songId, null);
      } else {
        // Dodaj lub zmień głos
        onVote(songId, voteType);
      }
    } else {
      onShowLoginModal();
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4 mb-4">
      <button
        onClick={() => handleVote('down')}
        className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ${
          userVote === 'down' ? 'ring-2 ring-red-500' : ''
        }`}
      >
        <FaThumbsDown className={`inline mr-2 ${userVote === 'down' ? 'text-red-300' : ''}`} />
        {votes < 0 ? Math.abs(votes) : 0}
      </button>
      <FavoriteButton
        songId={songId}
        isFavorite={isFavorite}
        isLoggedIn={isLoggedIn}
        onToggleFavorite={onToggleFavorite}
        onShowLoginModal={onShowLoginModal}
      />
      <button
        onClick={() => handleVote('up')}
        className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ${
          userVote === 'up' ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <FaThumbsUp className={`inline mr-2 ${userVote === 'up' ? 'text-blue-300' : ''}`} />
        {votes > 0 ? votes : 0}
      </button>
    </div>
  );
};

export default VotingButtons;
