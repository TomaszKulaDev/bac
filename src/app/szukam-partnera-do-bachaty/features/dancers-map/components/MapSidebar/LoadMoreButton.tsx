interface LoadMoreButtonProps {
  onClick: () => void;
}

export function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onClick}
        className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 
                 transition-colors duration-200 text-sm font-medium"
      >
        Pokaż więcej
      </button>
    </div>
  );
}
