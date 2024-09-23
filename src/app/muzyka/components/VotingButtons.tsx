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
    <div className="flex justify-between items-center w-full max-w-md mx-auto mb-4 space-x-2">
      <button
        onClick={() => handleVote('down')}
        className={`flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded text-sm font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300 ${
          userVote === 'down' ? 'ring-2 ring-red-500' : ''
        }`}
      >
        <FaThumbsDown className={`inline ${userVote === 'down' ? 'text-red-300' : ''}`} />
        <span className="ml-2 hidden sm:inline">Nie lubię</span>
        {votes < 0 && <span className="ml-1">({Math.abs(votes)})</span>}
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
        className={`flex-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded text-sm font-semibold shadow-md hover:from-indigo-600 hover:to-pink-600 transition duration-300 ${
          userVote === 'up' ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <span className="hidden sm:inline">Lubię </span>
        <FaThumbsUp className={`inline ${userVote === 'up' ? 'text-blue-300' : ''}`} />
        {votes > 0 && <span className="ml-1">({votes})</span>}
      </button>
    </div>
  );
};

export default VotingButtons;
