import React from "react";
import dynamic from "next/dynamic";

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const songs = [
  {
    id: "1",
    title: "Hey Mama",
    artist: "David Guetta",
    youtubeId: "UO3N_PRIgX0",
  },
  { id: "2", title: "To Binge", artist: "Gorillaz", youtubeId: "LMnrFiG8FRo" },
  {
    id: "3",
    title: "Blinding Lights",
    artist: "The Weeknd",
    youtubeId: "4NRXx6U8ABQ",
  },
  {
    id: "4",
    title: "Dance Monkey",
    artist: "Tones and I",
    youtubeId: "1__CAdTJ5JU",
  },
  {
    id: "5",
    title: "Shape of You",
    artist: "Ed Sheeran",
    youtubeId: "JGwWNGJdvx8",
  },
  {
    id: "6",
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    youtubeId: "OPf0YbXqDm0",
  },
];

export default function Muzyka() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Muzyka</h1>
      <MusicPlayer songs={songs} />
    </div>
  );
}
