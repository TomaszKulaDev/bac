import { useChartAnimation } from "../hooks/useChartAnimation";

interface RatingBarProps {
  value: number;
  artistId: string;
  isAnimating?: boolean;
  votes: number;
  maxVotes: number;
}

export const RatingBar = ({
  value,
  artistId,
  isAnimating,
  votes,
  maxVotes,
}: RatingBarProps) => {
  const calculateFillValue = () => {
    const ratingWeight = 0.7;
    const votesWeight = 0.3;

    // Normalizacja oceny do zakresu 0-1
    const normalizedRating = value / 5;
    const normalizedVotes = votes / maxVotes;

    return normalizedRating * ratingWeight + normalizedVotes * votesWeight;
  };

  const { animatedValue, isAnimating: isBarAnimating } = useChartAnimation({
    targetValue: calculateFillValue(),
    duration: 1000,
    delay: 200,
  });

  return (
    <div className="h-40 md:h-52 w-6 md:w-8 bg-gray-800/50 rounded-xl relative mb-3 overflow-hidden backdrop-blur-sm">
      <div
        className={`
          absolute bottom-0 w-full 
          bg-gradient-to-t from-red-500 via-purple-500 to-fuchsia-400 
          rounded-xl transition-all duration-700 ease-out 
          shadow-lg shadow-purple-500/20
          ${isAnimating ? "animate-pulse-fast" : ""}
        `}
        style={{
          height: `${animatedValue * 100}%`,
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-between py-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-[1px] bg-gray-700/30" />
        ))}
      </div>
    </div>
  );
};
