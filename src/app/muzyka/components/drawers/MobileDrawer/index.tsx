import BaseDrawer from "../base/BaseDrawer";
import SortingOptions from "./SortingOptions";
import { MobileDrawerProps } from "../../../types";
import { SortByType } from "@/app/muzyka/hooks/useDrawers";

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const handleSortChange = (newSortBy: SortByType) => {
    const newSortOrder =
      sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
    onSortChange(newSortBy, newSortOrder);
  };

  return (
    <BaseDrawer isOpen={isOpen} onClose={onClose} title="Sortowanie">
      <SortingOptions
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
    </BaseDrawer>
  );
};

export default MobileDrawer;
