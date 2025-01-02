export const NavbarSkeleton = () => {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-gradient">
          <div className="nav-content">
            <div className="w-full h-full flex items-center justify-between px-4">
              {/* Logo skeleton */}
              <div className="nav-item w-[100px]">
                <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse" />
              </div>

              {/* Menu główne skeleton */}
              <div className="nav-item hidden md:flex justify-center flex-1">
                <div className="flex items-center justify-between w-[600px]">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="h-4 w-24 bg-gray-300 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Przyciski logowania skeleton */}
              <div className="nav-item w-[100px] hidden md:flex justify-end gap-4">
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
              </div>

              {/* Przycisk mobilny skeleton */}
              <div className="md:hidden w-6 h-6 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[45px]" />
    </>
  );
};

export default NavbarSkeleton;
