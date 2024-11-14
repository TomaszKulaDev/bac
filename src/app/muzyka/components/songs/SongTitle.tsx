import { memo } from "react";

interface SongTitleProps {
  title: string;
}

export const SongTitle = memo(({ title }: SongTitleProps) => (
  <h3 className="font-semibold truncate text-sm text-black">
    {title.length > 50 ? `${title.slice(0, 50)}...` : title}
  </h3>
));

SongTitle.displayName = 'SongTitle';
