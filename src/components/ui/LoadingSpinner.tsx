export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 rounded-full border-4 border-amber-200 opacity-20 animate-ping" />

        {/* Inner spinner */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
        </div>

        {/* Loading text */}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500 whitespace-nowrap">
          Ładowanie...
        </span>
      </div>
    </div>
  );
}
