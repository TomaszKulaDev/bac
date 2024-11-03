import React from 'react';

const TopRatedSongs = () => {
  const dummyItems = Array(5).fill(null);

  return (
    <div className="w-full pt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 px-4">
        Top 5 utworów
      </h3>
      
      <div className="flex justify-center">
        <div className="flex gap-3 overflow-x-auto px-4 max-w-[800px]">
          {dummyItems.map((_, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer flex-shrink-0"
            >
              <div className="w-28 h-40 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gray-100 relative">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-white text-xs font-semibold truncate">
                          Przykładowy tytuł #{index + 1}
                        </div>
                        <div className="text-white/80 text-[10px] truncate">
                          Artysta
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedSongs;