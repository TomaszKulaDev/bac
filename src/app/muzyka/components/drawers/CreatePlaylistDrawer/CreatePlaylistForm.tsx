import { FaPlus } from "react-icons/fa";

interface CreatePlaylistFormProps {
  onCreatePlaylist: () => void;
}

const CreatePlaylistForm: React.FC<CreatePlaylistFormProps> = ({
  onCreatePlaylist,
}) => {
  return (
    <div className="p-6 space-y-4">
      <button
        onClick={onCreatePlaylist}
        className="w-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white px-6 py-3 rounded-lg 
        font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FaPlus className="text-lg" />
        <span>Utwórz nową playlistę</span>
      </button>
    </div>
  );
};

export default CreatePlaylistForm;
