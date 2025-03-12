export const NavbarSkeleton = () => {
  return (
    <>
      <div className="h-16" /> {/* Spacer */}
      <nav className="fixed top-0 left-0 right-0 z-[100]">
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between h-16 px-4 lg:px-8">
              {/* Logo skeleton */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-3 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>

              {/* Search Bar skeleton */}
              <div className="hidden lg:block max-w-xs w-full mx-4">
                <div className="w-full h-9 bg-gray-100 rounded-md animate-pulse" />
              </div>

              {/* Menu główne skeleton - desktop */}
              <div className="hidden md:flex items-center gap-3 flex-1 justify-center max-w-2xl">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="w-32 h-9 bg-gray-100 rounded-md animate-pulse"
                  />
                ))}
              </div>

              {/* Przyciski logowania skeleton - desktop */}
              <div className="hidden md:flex items-center gap-4">
                {/* Notifications skeleton */}
                <div className="w-24 h-9 bg-gray-100 rounded-md animate-pulse" />

                {/* Messages skeleton */}
                <div className="w-24 h-9 bg-gray-100 rounded-md animate-pulse" />

                {/* User menu skeleton */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-20 h-4 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>

              {/* Mobile menu button skeleton */}
              <div className="md:hidden w-20 h-9 bg-gray-100 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarSkeleton;
