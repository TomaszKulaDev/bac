import BaseDrawer from "../base/BaseDrawer";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { CreatePlaylistDrawerProps } from "../../../types/drawers";

const CreatePlaylistDrawer: React.FC<CreatePlaylistDrawerProps> = ({
  isOpen,
  onClose,
  onCreatePlaylist,
  isAuthenticated,
  showErrorToast,
}) => {
  const handleCreatePlaylist = () => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby tworzyć playlisty");
      return;
    }
    onCreatePlaylist();
    onClose();
  };

  return (
    <BaseDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Nowa playlista"
    >
      <CreatePlaylistForm onCreatePlaylist={handleCreatePlaylist} />
    </BaseDrawer>
  );
};

export default CreatePlaylistDrawer;
