const getNextSongIndex = useCallback(() => {
if (currentPlaylistId) {
const playlist = playlists.find(p => p.id === currentPlaylistId);
if (playlist) {
const currentSongId = songs[currentSongIndex].id;
const currentSongPlaylistIndex = playlist.songs.indexOf(currentSongId);

        if (currentSongPlaylistIndex < playlist.songs.length - 1) {
          // Znajdź indeks następnego utworu z playlisty w głównej tablicy songs
          const nextSongId = playlist.songs[currentSongPlaylistIndex + 1];
          return songs.findIndex(song => song.id === nextSongId);
        }
        // Jeśli to ostatni utwór w playliście, wróć do pierwszego
        const firstSongId = playlist.songs[0];
        return songs.findIndex(song => song.id === firstSongId);
      }
    }
    // Jeśli nie ma aktywnej playlisty, przejdź do następnego utworu w głównej liście
    return (currentSongIndex + 1) % songs.length;

}, [currentPlaylistId, playlists, songs, currentSongIndex]);

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Dodany skrypt do analizy struktury projektu:
//

```bash
npm run analyze
```

src/app/muzyka/types.ts
Definiuje interfejs Song z polem impro

src/store/slices/features/songsSlice.ts
Zawiera logikę Redux do zarządzania stanem piosenek, w tym impro

src/app/api/songs/route.ts
Obsługuje dodawanie piosenek do bazy danych, w tym pole impro

src/app/muzyka/utils/sortUtils.ts
Zawiera funkcję sortowania piosenek, w tym po polu impro

src/app/muzyka/components/SongList.tsx
Wyświetla listę piosenek, prawdopodobnie uwzględniając sortowanie

src/app/admin/music/components/AddSongForm.tsx
Formularz do dodawania nowych piosenek, zawiera pole dla impro

src/app/admin/music/page.tsx
Strona admina do zarządzania piosenkami, obsługuje dodawanie piosenek z impro

src/app/muzyka/page.tsx
Główna strona muzyki, obsługuje pobieranie i wyświetlanie piosenek z impro

src/models/Song.ts
Definiuje model MongoDB dla piosenek, zawiera pole impro

src/app/api/submit-song/route.ts
Może zawierać dodatkową logikę walidacji dla pola impro przy dodawaniu piosenek

src/app/muzyka/components/MusicPlayer.tsx
Komponent odtwarzacza muzyki, prawdopodobnie uwzględnia pole impro przy wyświetlaniu informacji o piosence

src/app/muzyka/components/PlaylistManager.tsx
Zarządza playlistami, może uwzględniać pole impro przy dodawaniu piosenek do playlist

src/app/admin/music/components/SongList.tsx
Lista piosenek w panelu admina, prawdopodobnie wyświetla informację o impro

src/app/muzyka/utils/youtube.ts
Może zawierać funkcje pomocnicze związane z YouTube, które mogą być używane przy dodawaniu piosenek z impro
