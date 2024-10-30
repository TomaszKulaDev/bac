import { FaPlus } from "react-icons/fa";

interface CreatePlaylistButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 px-4 py-3 
        bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white rounded-lg
        transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
    >
      <FaPlus />
      <span>Utwórz nową playlistę</span>
    </button>
  );
};

export default CreatePlaylistButton;