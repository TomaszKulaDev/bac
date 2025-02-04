import { PoplistaItem } from "./PoplistaItem";

const MOCK_SONGS = [
  {
    id: "1",
    position: 1,
    previousPosition: 2,
    title: "Nice To Meet Ya",
    artist: "Myles Smith",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273d171b4f83d5cd4cc5824afd6",
    votes: { up: 2345, down: 123 },
  },
  {
    id: "2",
    position: 2,
    previousPosition: 1,
    title: "Messy",
    artist: "Lola Young",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273c7cd462cc01b7e31fa93fe1c",
    votes: { up: 1987, down: 234 },
  },
  {
    id: "3",
    position: 3,
    previousPosition: 5,
    title: "Flowers",
    artist: "Miley Cyrus",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d",
    votes: { up: 1654, down: 187 },
  },
  {
    id: "4",
    position: 4,
    previousPosition: 3,
    title: "Unholy",
    artist: "Sam Smith & Kim Petras",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273a935e4689f15953311772cc4",
    votes: { up: 1432, down: 321 },
  },
  {
    id: "5",
    position: 5,
    previousPosition: 4,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    votes: { up: 1234, down: 167 },
  },
  {
    id: "6",
    position: 6,
    previousPosition: 6,
    title: "As It Was",
    artist: "Harry Styles",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f7",
    votes: { up: 987, down: 145 },
  },
  {
    id: "7",
    position: 7,
    previousPosition: 9,
    title: "About Damn Time",
    artist: "Lizzo",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b2736d7be0b5d3a9fff4b0677ce6",
    votes: { up: 876, down: 234 },
  },
  {
    id: "8",
    position: 8,
    previousPosition: 7,
    title: "Break My Soul",
    artist: "Beyoncé",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273af52c228c9619ff6298b08cd",
    votes: { up: 765, down: 123 },
  },
  {
    id: "9",
    position: 9,
    previousPosition: 8,
    title: "Late Night Talking",
    artist: "Harry Styles",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f7",
    votes: { up: 654, down: 98 },
  },
  {
    id: "10",
    position: 10,
    previousPosition: 11,
    title: "Hold Me Closer",
    artist: "Elton John & Britney Spears",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273935d8f6ed8cf8fc1c8761567",
    votes: { up: 543, down: 87 },
  },
  {
    id: "11",
    position: 11,
    previousPosition: 10,
    title: "Running Up That Hill",
    artist: "Kate Bush",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273a54f56fb72fb2a7d9d4e1ef5",
    votes: { up: 432, down: 76 },
  },
  {
    id: "12",
    position: 12,
    previousPosition: 14,
    title: "Stay With Me",
    artist: "Calvin Harris feat. Justin Timberlake",
    thumbnail:
      "https://i.scdn.co/image/ab67616d0000b273a7c4270b98d8f7da32ef3333",
    votes: { up: 321, down: 65 },
  },
];

export const PoplistaList = () => {
  return (
    <div className="space-y-4">
      {MOCK_SONGS.map((song) => (
        <PoplistaItem key={song.id} song={song} />
      ))}
    </div>
  );
};
