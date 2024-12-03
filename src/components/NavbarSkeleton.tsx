export const NavbarSkeleton = () => {
  return (
    <div className="h-16 bg-gray-800 animate-pulse">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <div className="w-32 h-8 bg-gray-600 rounded" />
        <div className="flex space-x-4">
          <div className="w-20 h-8 bg-gray-600 rounded" />
          <div className="w-20 h-8 bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
};

export default NavbarSkeleton; 