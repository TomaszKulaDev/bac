import React from 'react';

interface PlaylistHeaderProps {
  filteredSongsCount: number;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ filteredSongsCount }) => {
  return (
    <div className="bg-[#0a1e3b] text-white p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-[#ffd700] text-[#0a1e3b] text-sm font-bold px-3 py-1.5 rounded mr-3">
          Baciata.pl
        </div>
        <span className="text-base">Muzyka</span>
      </div>
      <h1 className="text-8xl font-bold mb-4 font-inter tracking-tight">
        Bachata Top lista 2024!
      </h1>
      <p className="text-xl font-inter">
        Do nich tańczysz na imprezach w 2024 roku!
      </p>
      <p className="text-white">
        {filteredSongsCount} utworów • Zaktualizowano:{" "}
        {new Date().toLocaleDateString("pl-PL")}
      </p>
    </div>
  );
};

export default PlaylistHeader;

