import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { FaTrash, FaGripVertical, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { Song } from '../types';
import { getYouTubeThumbnail } from '../utils/youtube';

interface DraggableSongItemProps {
  playlistId: string;
  song: Song;
  index: number;
  onRemove?: (songId: string) => void;
}

const DraggableSongItem: React.FC<DraggableSongItemProps> = ({
  playlistId,
  song,
  index,
  onRemove
}) => {
  const handleRemove = () => {
    if (onRemove && song._id) {
      onRemove(song._id);
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 
        transition-colors ${isDragging ? 'shadow-lg ring-2 ring-blue-400' : ''}`}
    >
      <div className="flex items-center space-x-3">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <FaGripVertical className="text-gray-400" />
        </div>
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={getYouTubeThumbnail(song.youtubeId)}
            alt={song.title}
            fill
            sizes="64px"
            className="rounded-md object-cover"
            priority={false}
          />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-800 truncate">{song.title}</p>
          <p className="text-sm text-gray-500 truncate">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-red-500"
        >
          <FaTrash />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DraggableSongItem; 