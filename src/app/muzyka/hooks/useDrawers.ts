import { useState, useCallback, useEffect } from 'react';

export type SortByType = "date" | "title" | "artist" | "impro" | "beginnerFriendly";
export type SortOrderType = "asc" | "desc";

interface UseDrawersProps {
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  onPlayPlaylist: (id: string) => void;
  onSortChange: (sortBy: SortByType, sortOrder: SortOrderType) => void;
  sortBy: SortByType;
  sortOrder: SortOrderType;
  isMobile: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

interface DrawerStates {
  isPlaylistSelectorOpen: boolean;
  isCreatePlaylistDrawerOpen: boolean;
  isMobileDrawerOpen: boolean;
  showDrawerButton: boolean;
  hasReachedPlaylist: boolean;
}

interface UseDrawersReturn extends DrawerStates {
  handlePlaylistSelect: (playlistId: string) => void;
  handleCreatePlaylist: () => void;
  handleSortChange: (newSortBy: SortByType) => void;
  toggleDrawer: (drawerName: keyof Pick<DrawerStates, 'isPlaylistSelectorOpen' | 'isCreatePlaylistDrawerOpen' | 'isMobileDrawerOpen'>) => void;
  closeAllDrawers: () => void;
  setDrawerStates: React.Dispatch<React.SetStateAction<DrawerStates>>;
  toggleDrawerState: (drawerName: keyof DrawerStates, value: boolean) => void;
}

export const useDrawers = ({
  isAuthenticated,
  showErrorToast,
  onCreatePlaylist,
  onPlayPlaylist,
  onSortChange,
  sortBy,
  sortOrder,
  isMobile,
  setIsModalOpen
}: UseDrawersProps) => {
  const [drawerStates, setDrawerStates] = useState<DrawerStates>({
    isPlaylistSelectorOpen: false,
    isCreatePlaylistDrawerOpen: false,
    isMobileDrawerOpen: false,
    showDrawerButton: false,
    hasReachedPlaylist: false
  });

  const handlePlaylistSelect = useCallback((playlistId: string) => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby odtwarzać playlisty");
      return;
    }
    onPlayPlaylist(playlistId);
    setDrawerStates(prev => ({ ...prev, isPlaylistSelectorOpen: false }));
  }, [isAuthenticated, showErrorToast, onPlayPlaylist]);

  const handleCreatePlaylist = useCallback(() => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby tworzyć playlisty");
      return;
    }
    setIsModalOpen(true);
    setDrawerStates(prev => ({ ...prev, isCreatePlaylistDrawerOpen: false }));
  }, [isAuthenticated, showErrorToast, setIsModalOpen]);

  const handleSortChange = useCallback((newSortBy: SortByType) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
    onSortChange(newSortBy, newSortOrder);
    setDrawerStates(prev => ({ ...prev, isMobileDrawerOpen: false }));
  }, [sortBy, sortOrder, onSortChange]);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const playlistSection = document.getElementById("playlist-section");
      const playerContainer = document.querySelector(".youtube-player");

      if (playlistSection && playerContainer) {
        const playlistRect = playlistSection.getBoundingClientRect();
        const playerRect = playerContainer.getBoundingClientRect();

        setDrawerStates(prev => ({
          ...prev,
          hasReachedPlaylist: playlistRect.top <= window.innerHeight,
          showDrawerButton: playerRect.bottom < 0
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const toggleDrawer = useCallback((drawerName: keyof Pick<DrawerStates, 'isPlaylistSelectorOpen' | 'isCreatePlaylistDrawerOpen' | 'isMobileDrawerOpen'>) => {
    setDrawerStates(prev => ({
      ...prev,
      [drawerName]: !prev[drawerName]
    }));
  }, []);

  const closeAllDrawers = useCallback(() => {
    setDrawerStates(prev => ({
      ...prev,
      isPlaylistSelectorOpen: false,
      isCreatePlaylistDrawerOpen: false,
      isMobileDrawerOpen: false
    }));
  }, []);

  const toggleDrawerState = useCallback((drawerName: keyof DrawerStates, value: boolean) => {
    setDrawerStates(prev => ({
      ...prev,
      [drawerName]: value
    }));
  }, []);

  return {
    ...drawerStates,
    handlePlaylistSelect,
    handleCreatePlaylist,
    handleSortChange,
    toggleDrawer,
    closeAllDrawers,
    setDrawerStates,
    toggleDrawerState
  };
};
