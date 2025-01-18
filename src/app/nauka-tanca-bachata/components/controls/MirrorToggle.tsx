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
      className={`video-control-button ${value ? "active" : ""}`}
    >
      <svg viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
      <span>{value ? "Odbicie włączone" : "Odbicie wyłączone"}</span>
    </button>
  );
};
