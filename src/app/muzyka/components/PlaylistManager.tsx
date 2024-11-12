import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaPlay, FaChevronUp, FaChevronDown, FaEdit, FaTrash, FaPlus, FaMusic, FaHeart, FaBookmark } from "react-icons/fa";
import { Playlist, Song } from "../types";
import { getYouTubeThumbnail } from "../utils/youtube";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DraggableSong } from "../types";
import { updatePlaylistOrder } from "@/store/slices/features/playlistSlice";
import { useDispatch } from "react-redux";
import DraggableSongItem from "./DraggableSongItem";
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { usePlaylistManagement } from "../hooks/usePlaylistManagement";
import { usePlaylistSync } from "../hooks/usePlaylistSync";

export interface PlaylistManagerProps {
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  onDeletePlaylist: (id: string) => void;
  onRenamePlaylist: (id: string, newName: string) => void;
  onRemoveSongFromPlaylist: (playlistId: string, songId: string) => void;
  onCreatePlaylist: (name: string) => void;
  isMobile: boolean;
  onPlayPlaylist: (playlistId: string) => void;
  currentPlaylistId: string | null;
  setCurrentPlaylistId: (id: string | null) => void;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  onUpdatePlaylists: (updater: (prevPlaylists: Playlist[]) => Playlist[]) => void;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  isAuthenticated: boolean;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  playlists,
  songs,
  expandedPlaylist,
  setExpandedPlaylist,
  onDeletePlaylist,
  onRenamePlaylist,
  onRemoveSongFromPlaylist,
  onCreatePlaylist,
  isMobile,
  onPlayPlaylist,
  currentPlaylistId,
  setCurrentPlaylistId,
  onAddToPlaylist,
  setIsModalOpen,
  isModalOpen,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  onUpdatePlaylists,
  setPlaylists,
  isAuthenticated
}) => {
  const dispatch = useDispatch();

  const getSongDetails = (songId: string): Song | undefined => 
    songs.find((song) => song._id === songId || song.id === songId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const playlistManagement = usePlaylistManagement({
    playlists,
    onUpdatePlaylists: (updater) => {
      const newPlaylists = updater(playlists);
      setPlaylists(newPlaylists);
    },
    onPlayPlaylist,
    currentPlaylistId,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    isAuthenticated,
    songs,
    onCreatePlaylist,
    setCurrentPlaylistId
  });

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const getPlaylistId = (playlist: Playlist): string => {
    return playlist._id || playlist.id || '';
  };

  const handlePlaylistUpdate = async (playlistId: string, data: Partial<Playlist>) => {
    if (!playlistId || !isAuthenticated) {
      showErrorToast('Musisz być zalogowany, aby zarządzać playlistami');
      return;
    }

    if (!navigator.onLine) {
      addOperation({
        type: 'UPDATE',
        playlistId,
        data
      });
      showInfoToast('Zmiany zostaną zsynchronizowane gdy połączenie zostanie przywrócone');
      return;
    }
    
    try {
      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Błąd aktualizacji playlisty');

      const updatedPlaylist = await response.json();
      const normalizedId = updatedPlaylist._id || updatedPlaylist.id;
      
      if (!normalizedId) throw new Error('Brak ID w odpowiedzi');

      setPlaylists((prev) => 
        prev.map(p => (getPlaylistId(p) === playlistId) ? {
          ...updatedPlaylist,
          _id: normalizedId,
          id: normalizedId
        } : p)
      );
    } catch (error) {
      console.error("Błąd podczas aktualizacji playlisty:", error);
      showErrorToast('Nie udało się zaktualizować playlisty');
    }
  };

  const handleDeletePlaylist = async (id: string) => {
    if (!id) return;
    
    try {
      await onDeletePlaylist(id);
      if (currentPlaylistId === id) {
        setCurrentPlaylistId(null);
      }
    } catch (error) {
      console.error('Błąd podczas usuwania playlisty:', error);
      showErrorToast('Nie udało się usunąć playlisty');
    }
  };

  const handleRenamePlaylist = (id: string, newName: string) => {
    if (!id || !newName) return;
    playlistManagement.editPlaylistName(id, newName);
  };

  const handlePlay = useCallback((playlist: Playlist) => {
    const id = getPlaylistId(playlist);
    if (!id) return;
    
    onPlayPlaylist(id);
    setCurrentPlaylistId(id);
  }, [onPlayPlaylist, setCurrentPlaylistId]);

  const handleDelete = async (playlist: Playlist) => {
    const playlistId = playlist._id || playlist.id;
    if (!playlistId) return;
    
    try {
      await handleDeletePlaylist(playlistId);
      setPlaylists(prevPlaylists => 
        prevPlaylists.filter(p => (p._id || p.id) !== playlistId)
      );
      if (expandedPlaylist === playlistId) {
        setExpandedPlaylist(null);
      }
    } catch (error) {
      console.error('Błąd podczas usuwania playlisty:', error);
      showErrorToast('Nie udało się usunąć playlisty');
    }
  };

  const handleRename = useCallback((playlist: Playlist, newName: string) => {
    const id = getPlaylistId(playlist);
    if (!id) return;
    onRenamePlaylist(id, newName);
  }, [onRenamePlaylist]);

  const handleExpandPlaylist = useCallback((playlist: Playlist) => {
    const id = getPlaylistId(playlist);
    setExpandedPlaylist(id || null);
  }, [setExpandedPlaylist]);

  const renderDraggableSongItem = useCallback((playlist: Playlist, song: Song, index: number) => {
    const playlistId = getPlaylistId(playlist);
    if (!playlistId) return null;
    
    return (
      <DraggableSongItem
        key={song._id}
        playlistId={playlistId}
        song={song}
        index={index}
        onRemove={(songId) => onRemoveSongFromPlaylist(playlistId, songId)}
      />
    );
  }, [onRemoveSongFromPlaylist]);

  const { addOperation } = usePlaylistSync({ showErrorToast });

  return (
    <div className="space-y-4 overflow-y-auto flex-grow p-4">
      {playlists.length < 2 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (!isAuthenticated) {
              showErrorToast("Musisz być zalogowany, aby utworzyć playlistę");
              return;
            }
            setIsModalOpen(true);
          }}
          className="w-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white px-6 py-3 rounded-lg 
            font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaPlus className={`text-lg ${!isAuthenticated && 'hidden'}`} />
          <span>{isAuthenticated ? "Stwórz swoją playlistę" : "Dołącz do nas i twórz playlisty"}</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <CreatePlaylistModal
            onClose={() => setIsModalOpen(false)}
            onCreatePlaylist={onCreatePlaylist}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
          />
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300
              ${playlist.id === currentPlaylistId ? 'ring-2 ring-[#2a4a7f] ring-opacity-50' : ''}
            `}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePlay(playlist)}
                    className={`
                      p-3 rounded-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white
                      shadow-md hover:shadow-lg transition-all duration-300
                    `}
                  >
                    <FaPlay className="text-lg" />
                  </motion.button>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{playlist.name}</h3>
                    <p className="text-sm text-gray-500">{playlist.songs.length} utworów</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleExpandPlaylist(playlist)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {expandedPlaylist === playlist.id ? <FaChevronUp /> : <FaChevronDown />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const newName = prompt("Podaj nową nazwę playlisty:", playlist.name);
                      if (newName) handleRename(playlist, newName);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-blue-500"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (window.confirm('Czy na pewno chcesz usunąć tę playlistę?')) {
                        handleDelete(playlist);
                      }
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {expandedPlaylist === playlist.id && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToParentElement]}
                    onDragEnd={(event) => playlistManagement.handleDragEnd(event, playlist)}
                  >
                    <SortableContext
                      items={playlist.songs}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2 mt-4">
                        {playlist.songs.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <FaMusic className="mx-auto text-4xl mb-2 opacity-50" />
                            <p>Playlist jest pusta. Dodaj swoje ulubione utwory!</p>
                          </div>
                        ) : (
                          playlist.songs.map((songId) => {
                            const songDetails = getSongDetails(songId);
                            return songDetails ? (
                              renderDraggableSongItem(playlist, songDetails, playlist.songs.indexOf(songId))
                            ) : (
                              <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                                Utwór niedostępny
                              </div>
                            );
                          })
                        )}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {!isMobile && playlists.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm"
        >
          Osiągnięto limit 2 playlist. Usuń jedną z istniejących, aby utworzyć nową albo wykup premium.
        </motion.div>
      )}
    </div>
  );
};

export default PlaylistManager;
