import { BadgeContainerProps } from "./types";

export const BadgeContainer: React.FC<BadgeContainerProps> = ({ song }) => {
  return (
    <div className="absolute top-2 left-2 flex gap-1">
      <span className="px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
        Nowość
      </span>
      <span className="px-2 py-0.5 text-xs font-medium bg-pink-500 text-white rounded-full">
        Premium
      </span>
      <span className="px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">
        Bachata
      </span>
    </div>
  );
};
