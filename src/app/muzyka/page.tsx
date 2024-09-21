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
    youtubeId: "q0hyYWKXF0Q",
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
  {
    id: "7",
    title: "Despacito",
    artist: "Luis Fonsi & Daddy Yankee ft. Justin Bieber",
    youtubeId: "kJQP7kiw5Fk",
  },
  {
    id: "8",
    title: "Sugar",
    artist: "Maroon 5",
    youtubeId: "09R8_2nJtjg",
  },
  {
    id: "9",
    title: "Roar",
    artist: "Katy Perry",
    youtubeId: "CevxZvSJLk8",
  },
  {
    id: "10",
    title: "Shake It Off",
    artist: "Taylor Swift",
    youtubeId: "nfWlot6h_JM",
  },
  {
    id: "11",
    title: "Happy",
    artist: "Pharrell Williams",
    youtubeId: "ZbZSe6N_BXs",
  },
  {
    id: "12",
    title: "Can't Stop the Feeling!",
    artist: "Justin Timberlake",
    youtubeId: "ru0K8uYEZWw",
  },
  {
    id: "13",
    title: "Havana",
    artist: "Camila Cabello",
    youtubeId: "BQ0mxQXmLsk",
  },
  {
    id: "14",
    title: "Cheap Thrills",
    artist: "Sia ft. Sean Paul",
    youtubeId: "nYh-n7EOtMA",
  },
  {
    id: "15",
    title: "Closer",
    artist: "The Chainsmokers ft. Halsey",
    youtubeId: "PT2_F-1esPk",
  },
  {
    id: "16",
    title: "Señorita",
    artist: "Shawn Mendes & Camila Cabello",
    youtubeId: "Pkh8UtuejGw",
  },
  {
    id: "17",
    title: "Bad Guy",
    artist: "Billie Eilish",
    youtubeId: "DyDfgMOUjCI",
  },
  {
    id: "18",
    title: "7 Rings",
    artist: "Ariana Grande",
    youtubeId: "QYh6mYIJG2Y",
  },
  {
    id: "19",
    title: "Old Town Road",
    artist: "Lil Nas X ft. Billy Ray Cyrus",
    youtubeId: "r7qovpFAGrQ",
  },
  {
    id: "20",
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    youtubeId: "ApXoWvfEYVU",
  },
  {
    id: "21",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    youtubeId: "E07s5ZYygMg",
  },
  {
    id: "22",
    title: "Don't Start Now",
    artist: "Dua Lipa",
    youtubeId: "oygrmJFKYZY",
  },
  {
    id: "23",
    title: "Memories",
    artist: "Maroon 5",
    youtubeId: "SlPhMPnQ58k",
  },
  {
    id: "24",
    title: "Circles",
    artist: "Post Malone",
    youtubeId: "wXhTHyIgQ_U",
  },
  {
    id: "25",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    youtubeId: "zABLecsR5UE",
  },
  {
    id: "26",
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    youtubeId: "bo_efYhYU2A",
  },
  {
    id: "27",
    title: "Believer",
    artist: "Imagine Dragons",
    youtubeId: "7wtfhZwyrcc",
  },
  {
    id: "28",
    title: "Thunder",
    artist: "Imagine Dragons",
    youtubeId: "fKopy74weus",
  },
  {
    id: "29",
    title: "Girls Like You",
    artist: "Maroon 5 ft. Cardi B",
    youtubeId: "aJOTlE1K90k",
  },
  {
    id: "30",
    title: "Senorita",
    artist: "Shawn Mendes & Camila Cabello",
    youtubeId: "Pkh8UtuejGw",
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
