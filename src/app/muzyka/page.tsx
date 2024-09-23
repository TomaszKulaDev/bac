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
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "2",
    title: "To Binge",
    artist: "Gorillaz",
    youtubeId: "LMnrFiG8FRo",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "3",
    title: "Blinding Lights",
    artist: "The Weeknd",
    youtubeId: "4NRXx6U8ABQ",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "4",
    title: "Dance Monkey",
    artist: "Tones and I",
    youtubeId: "q0hyYWKXF0Q",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "5",
    title: "Shape of You",
    artist: "Ed Sheeran",
    youtubeId: "JGwWNGJdvx8",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "6",
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    youtubeId: "OPf0YbXqDm0",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "7",
    title: "Despacito",
    artist: "Luis Fonsi & Daddy Yankee ft. Justin Bieber",
    youtubeId: "kJQP7kiw5Fk",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "8",
    title: "Sugar",
    artist: "Maroon 5",
    youtubeId: "09R8_2nJtjg",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "9",
    title: "Roar",
    artist: "Katy Perry",
    youtubeId: "CevxZvSJLk8",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "10",
    title: "Shake It Off",
    artist: "Taylor Swift",
    youtubeId: "nfWlot6h_JM",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "11",
    title: "Happy",
    artist: "Pharrell Williams",
    youtubeId: "ZbZSe6N_BXs",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "12",
    title: "Can't Stop the Feeling!",
    artist: "Justin Timberlake",
    youtubeId: "ru0K8uYEZWw",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "13",
    title: "Havana",
    artist: "Camila Cabello",
    youtubeId: "BQ0mxQXmLsk",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "14",
    title: "Cheap Thrills",
    artist: "Sia ft. Sean Paul",
    youtubeId: "nYh-n7EOtMA",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "15",
    title: "Closer",
    artist: "The Chainsmokers ft. Halsey",
    youtubeId: "PT2_F-1esPk",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "16",
    title: "Señorita",
    artist: "Shawn Mendes & Camila Cabello",
    youtubeId: "Pkh8UtuejGw",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "17",
    title: "Bad Guy",
    artist: "Billie Eilish",
    youtubeId: "DyDfgMOUjCI",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "18",
    title: "7 Rings",
    artist: "Ariana Grande",
    youtubeId: "QYh6mYIJG2Y",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "19",
    title: "Old Town Road",
    artist: "Lil Nas X ft. Billy Ray Cyrus",
    youtubeId: "r7qovpFAGrQ",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "20",
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    youtubeId: "ApXoWvfEYVU",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "21",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    youtubeId: "E07s5ZYygMg",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "22",
    title: "Don't Start Now",
    artist: "Dua Lipa",
    youtubeId: "oygrmJFKYZY",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "23",
    title: "Memories",
    artist: "Maroon 5",
    youtubeId: "SlPhMPnQ58k",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "24",
    title: "Circles",
    artist: "Post Malone",
    youtubeId: "wXhTHyIgQ_U",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "25",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    youtubeId: "zABLecsR5UE",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "26",
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    youtubeId: "bo_efYhYU2A",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "27",
    title: "Believer",
    artist: "Imagine Dragons",
    youtubeId: "7wtfhZwyrcc",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "28",
    title: "Thunder",
    artist: "Imagine Dragons",
    youtubeId: "fKopy74weus",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "29",
    title: "Girls Like You",
    artist: "Maroon 5 ft. Cardi B",
    youtubeId: "aJOTlE1K90k",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
  },
  {
    id: "30",
    title: "Senorita",
    artist: "Shawn Mendes & Camila Cabello",
    youtubeId: "Pkh8UtuejGw",
    score: 0,
    votes: 0,
    isFavorite: false,
    userVote: null, // Dodajemy domyślną wartość userVote
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
