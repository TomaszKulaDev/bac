import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";

interface PlaylistControlsProps {
  isExpanded: boolean;
  onExpand: () => void;
  onRename: () => void;
  onDelete: () => void;
}

const PlaylistControls: React.FC<PlaylistControlsProps> = ({
  isExpanded,
  onExpand,
  onRename,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onExpand}
        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
      >
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRename}
        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
      >
        <FaEdit />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
      >
        <FaTrash />
      </motion.button>
    </div>
  );
};

export default PlaylistControls;
