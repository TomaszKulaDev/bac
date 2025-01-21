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
const [videoUrl, setVideoUrl] = useState<string>("");
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
const fetchVideoUrl = async () => {
try {
setIsLoading(true);
setError(null);

        // Używamy proxy CORS, aby ominąć ograniczenia CORS.
        // W produkcyjnym środowisku powinieneś mieć własny serwer proxy,
        // aby uniknąć problemów z wydajnością i stabilnością.
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const targetUrl = `${proxyUrl}${url}`;

        const response = await fetch(targetUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();

        // Wyrażenie regularne do znalezienia URL-a wideo.
        // To jest BARDZO uproszczone i może łatwo przestać działać.
        const videoUrlMatch = /<meta property="og:video" content="([^"]+)"/.exec(html);

        if (videoUrlMatch && videoUrlMatch[1]) {
          // Trzeba usunąć dodany na początku adres proxy
          setVideoUrl(videoUrlMatch[1].replace(proxyUrl, ''));
        } else {
          throw new Error("Nie znaleziono URL-a filmu w kodzie HTML.");
        }
      } catch (error: any) {
        setError(
          error.message || "Nie udało się załadować filmu z Instagrama"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoUrl();

}, [url]);

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

return videoUrl ? (
<video width="640" height="360" controls src={videoUrl} className="w-full aspect-video" />
) : null;
};
