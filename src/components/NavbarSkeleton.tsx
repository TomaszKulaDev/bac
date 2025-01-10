export const NavbarSkeleton = () => {
  return (
    <>
      {/* Spacer */}
      <div className="h-[88px]" />

      <nav className="fixed top-0 left-0 right-0 z-[100]">
        {/* Górny pasek */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white h-6">
          <div className="max-w-[1200px] mx-auto px-4 h-full">
            <div className="flex items-center justify-between text-[11px] h-full">
              {/* Lewe elementy */}
              <div className="flex items-center gap-4">
                <div className="w-40 h-2 bg-white/20 rounded animate-pulse" />
                <div className="hidden sm:block w-32 h-2 bg-white/20 rounded animate-pulse" />
              </div>
              {/* Prawe elementy */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-2 bg-white/20 rounded animate-pulse" />
                <div className="w-14 h-2 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Główna nawigacja */}
        <div className="bg-white border-b border-gray-100 shadow-sm h-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between h-16 px-4">
              {/* Logo skeleton */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-100 rounded-lg animate-pulse" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-3 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>

              {/* Menu główne skeleton - desktop */}
              <div className="hidden md:flex items-center gap-1 flex-1 justify-center max-w-2xl">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 w-28 h-9 bg-gray-100 rounded-lg animate-pulse"
                  />
                ))}
              </div>

              {/* Przyciski logowania skeleton - desktop */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
                <div className="w-28 h-9 bg-gray-200 rounded-lg animate-pulse" />
              </div>

              {/* Przycisk mobilny skeleton */}
              <div className="md:hidden w-10 h-10 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarSkeleton;
