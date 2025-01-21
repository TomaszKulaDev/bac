import { useEffect, useRef, useState } from "react";

interface InstagramPlayerProps {
  url: string;
  onProgress?: (progress: number) => void;
  onDurationChange?: (duration: number) => void;
}

export const InstagramPlayer: React.FC<InstagramPlayerProps> = ({
  url,
  onProgress,
  onDurationChange,
}) => {
  const [embedHtml, setEmbedHtml] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOembed = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`
        );
        const data = await response.json();
        setEmbedHtml(data.html);
      } catch (error) {
        setError("Nie udało się załadować filmu z Instagrama");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOembed();
  }, [url]);

  useEffect(() => {
    if (embedHtml && containerRef.current) {
      // Wstrzykujemy skrypt Instagrama
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [embedHtml]);

  if (isLoading) {
    return <div className="w-full aspect-video bg-gray-100 animate-pulse" />;
  }

  if (error) {
    return (
      <div className="w-full aspect-video bg-red-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="instagram-media-container w-full aspect-video"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
};
