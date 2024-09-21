import React from "react";
import dynamic from "next/dynamic";

const MusicPlayer = dynamic(
  () => import("@/app/muzyka/components/MusicPlayer"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const songs = [
  {
    id: "1",
    title: "Hey Mama",
    artist: "David Guetta",
    youtubeId: "UO3N_PRIgX0",
  },
  {
    id: "2",
    title: "To Binge",
    artist: "Gorillaz",
    youtubeId: "LMnrFiG8FRo",
  },
  // Dodaj thumbnailUrl dla pozostałych utworów
];

export default function Muzyka() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Muzyka</h1>
      <MusicPlayer songs={songs} />
    </div>
  );
}
