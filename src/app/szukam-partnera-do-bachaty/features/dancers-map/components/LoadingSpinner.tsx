export function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-sm text-amber-600 font-medium">Ładowanie mapy...</p>
      </div>
    </div>
  );
}
