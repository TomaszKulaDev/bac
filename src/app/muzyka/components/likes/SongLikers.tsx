import { useEffect, useState } from "react";

interface SongLikersProps {
  songId: string;
}

interface Liker {
  email: string;
}

export const SongLikers = ({ songId }: SongLikersProps) => {
  const [likers, setLikers] = useState<Liker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikers = async () => {
      try {
        const response = await fetch(`/api/musisite/songs/${songId}/likers`);
        if (!response.ok) throw new Error("Błąd podczas pobierania danych");
        const data = await response.json();
        setLikers(data.users);
    
      } catch (error) {
        console.error("Błąd:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikers();
  }, [songId]);

  if (isLoading) return null;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {likers.map((liker, index) => (
        <div
          key={index}
          className="inline-block h-8 w-8 rounded-full bg-gray-200 border-2 border-white"
          title={liker.email}
        >
          <span className="flex h-full w-full items-center justify-center text-xs font-medium text-gray-600">
            {liker.email.charAt(0).toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};
