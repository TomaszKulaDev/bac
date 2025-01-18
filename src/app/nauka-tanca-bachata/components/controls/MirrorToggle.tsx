interface MirrorToggleProps {
  value: boolean;
  onChange: (mirrored: boolean) => void;
}

export const MirrorToggle: React.FC<MirrorToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
        value
          ? "bg-amber-100 text-amber-700"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      Odbicie lustrzane
    </button>
  );
};
