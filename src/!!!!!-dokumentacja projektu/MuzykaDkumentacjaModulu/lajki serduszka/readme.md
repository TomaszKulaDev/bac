Żeby  stworzyc lajki i serduszka wykorzystaliśmy następujące pliki do stworzenia funkcjonalności lajkowania:
    - Następnie należy zaktualizować endpoint API dla like'ów, aby używał email zamiast ID. 
    - Wygląda na to, że w całej aplikacji używamy email jako identyfikatora użytkownika (widać to w src/app/api/users/update-profile/route.ts linie 32-33).

1. Hook useLike.ts w folderze app/muzyka/hooks
        - Główny hook obsługujący logikę lajkowania
        - Integracja z Redux i Next-Auth
        - Obsługa błędów i autoryzacji

            Kod: 
            ```
            import { useCallback, useState } from 'react';
            import { useDispatch } from 'react-redux';
            import { AppDispatch } from '@/store/store';
            import { toggleLike } from '@/store/slices/features/songsSlice';
            import { useSession, signIn } from 'next-auth/react';

            export const useLike = () => {
            const dispatch = useDispatch<AppDispatch>();
            const { data: session, status } = useSession();
            const [isRefreshing, setIsRefreshing] = useState(false);

            const handleLike = useCallback(async (songId: string) => {
                if (!songId) return;
                
                if (status === 'unauthenticated') {
                await signIn();
                return;
                }
                
                if (!session?.user?.email) {
                console.error('No user email in session');
                return;
                }
                
                try {
                const result = await dispatch(toggleLike(songId)).unwrap();
                return result;
                } catch (error: any) {
                console.error('Error toggling like:', error);
                throw error;
                }
            }, [dispatch, session, status]);

            return { handleLike };
            };

    2. Slice Redux dla piosenek
        - Akcja asynchroniczna toggleLike
        - Komunikacja z API
        - Obsługa błędów HTTP

                Kod: 
                // Dodajemy nowe akcje do istniejącego slice'a
            export const toggleLike = createAsyncThunk(
            'songs/toggleLike',
            async (songId: string, { rejectWithValue }) => {
                try {
                const response = await fetch(`/api/songs/${songId}/like`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Toggle like error response:', {
                    status: response.status,
                    errorData
                    });
                    
                    if (response.status === 401) {
                    return rejectWithValue({
                        status: 401,
                        message: 'Unauthorized - Please log in',
                        details: null
                    });
                    }
                    
                    return rejectWithValue({
                    status: response.status,
                    message: errorData.error || 'Failed to toggle like',
                    details: errorData.details || null
                    });
                }
                
                const data = await response.json();
                return { songId, ...data };
                } catch (error: any) {
                console.error('Toggle like unexpected error:', error);
                return rejectWithValue({
                    status: 500,
                    message: 'Unexpected error while toggling like',
                    details: error.message
                });
                }
            }
            );

    3. Komponent RecommendedSongs.tsx w folderze app/muzyka/components
        - Obsługa logiki lajkowania w komponencie
        - Wywołanie handleLike z useLike
        - Renderowanie przycisków lajkowania
        - Implementacja przycisku lajkowania
        - Wyświetlanie liczby polubień
        - Obsługa interakcji użytkownika    

        Kod:  const RecommendedSongs: React.FC<RecommendedSongsProps> = ({
        songs,
        currentSongId,
        isPlaying,
        onSongSelect,
        onAddToPlaylist,
        expandedPlaylist,
        onToggleFavorite,
        }) => {
        const recommendedSongs = getRecommendedSongs(songs);
        const duration3 = useVideoDuration(recommendedSongs[2]?.youtubeId);
        const duration1 = useVideoDuration(recommendedSongs[0]?.youtubeId);
        const duration2 = useVideoDuration(recommendedSongs[1]?.youtubeId);
        const duration3 = useVideoDuration(recommendedSongs[2]?.youtubeId);
        const duration4 = useVideoDuration(recommendedSongs[3]?.youtubeId);
        const duration5 = useVideoDuration(recommendedSongs[4]?.youtubeId);
            [recommendedSongs[1]?.id]: duration2,
        const durations: Record<string, string> = {
            [recommendedSongs[0]?.id]: duration1,
            [recommendedSongs[1]?.id]: duration2,
            [recommendedSongs[2]?.id]: duration3,
            [recommendedSongs[3]?.id]: duration4,
            [recommendedSongs[4]?.id]: duration5,
        };
        return (
        const { handleLike } = useLike();
            <div className="w-full bg-gradient-to-b from-[#0a1e3b] to-[#2a4a7f] text-white p-6 rounded-t-3xl">
        return (
            <div className="w-full bg-gradient-to-b from-[#0a1e3b] to-[#2a4a7f] text-white p-6 rounded-t-3xl">
            <h2 className="text-2xl font-bold mb-6">
                Nasze Muzyczne Polecenia {new Date().getFullYear()}!
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] table-auto">
                <thead className="text-blue-200/70 text-sm uppercase border-b border-blue-700/30">
                    <tr>
                    <th className="px-4 py-2 text-left">TYTUŁ</th>
                    <th className="px-4 py-2 text-left">ARTYSTA</th>
                    <th className="px-4 py-2 text-left">ALBUM</th>
                    <th className="px-4 py-2 text-right">CZAS</th>
                    <th className="w-24"></th>
                    </tr>
                </thead>
                <tbody>
                    {recommendedSongs.map((song) => {
                    const isCurrentSong = song.id === currentSongId;
                    return (
                    return (
                        <tr
                        key={song.id}
                        onClick={() => onSongSelect(song.id)}
                        role="button"
                        aria-label={`Odtwórz ${song.title} - ${song.artist}`}
                        className={`
                            hover:bg-blue-800/20 transition-colors cursor-pointer
                            ${isCurrentSong ? "bg-blue-800/30" : ""}
                        `}
                        >
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                            <div className="relative group w-10 h-10 flex-shrink-0">
                                <Image
                                src={getYouTubeThumbnail(song.youtubeId)}
                                alt={`Okładka albumu ${song.title}`}
                                width={40}
                                height={40}
                                className="object-cover rounded"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/images/default-album-cover.jpg";
                                }}
                                />
                                <button
                                onClick={() => onSongSelect(song.id)}
                                className="absolute inset-0 flex items-center justify-center bg-[#0a1e3b]/60 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                {isCurrentSong && isPlaying ? (
                                    <FaPause className="w-4 h-4" />
                                ) : (
                                    <FaPlay className="w-4 h-4" />
                                )}
                                </button>
                            </div>
                            <div className="min-w-0">
                                <div className="font-medium truncate">{song.title}</div>
                                <div className="text-sm text-blue-200/70 truncate">
                                {song.artist}
                                </div>
                            </div>
                            </div>
                        </td>
                        <td className="px-4 py-3 truncate text-blue-100">
                            {song.artist}
                        </td>
                        <td className="px-4 py-3 truncate text-blue-100">
                            {song.title}
                        </td>
                        <td className="px-4 py-3 text-right text-blue-100">
                            {durations[song.id] || "--:--"}
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                onAddToPlaylist(song.id);
                                }}
                                className="p-2 text-blue-200 hover:text-white transition-colors"
                                title="Dodaj do playlisty"
                            >
                                <FaBookmark className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                handleLike(song._id);
                                }}
                                className={`p-2 transition-colors ${
                                song.isLiked
                                    ? "text-red-500"
                                    : "text-blue-200 hover:text-white"
                                }`}
                                title={
                                song.isLiked
                                    ? "Usuń z ulubionych"
                                    : "Dodaj do ulubionych"
                                }
                            >
                                <FaHeart className="w-4 h-4" />
                                <span className="ml-1 text-sm">
                                {song.likesCount || 0}
                                </span>
                            </button>
                            </div>
                        </td>

5. Strona główna MusicPage.tsx w folderze app/muzyka
    - Integracja z komponentami
    - Obsługa stanu autoryzacji
    - Zarządzanie komunikatami dla użytkownika
    - Te pliki tworzą kompletny system lajkowania z:
     - Obsługą stanu (Redux) 
     - Autoryzacją (Next-Auth)
     - UI (komponenty React)
    - Komunikacją z API (fetch)
     - Obsługą błędów
        - Komunikatami dla użytkownika

        Kod:
                />
        <SongGrid
            songs={songs}
            currentSongId={songs[currentSongIndex]?.id}
            isPlaying={isPlaying}
            onSongSelect={(songId) => {
            const index = songs.findIndex(s => s.id === songId);
            if (index !== -1) {
                dispatch(setCurrentSongIndex(index));
                setIsPlaying(true);
            }
            }}
            onAddToPlaylist={(songId) => {
            if (expandedPlaylist) {
                playlistManagement.addSongToPlaylist(expandedPlaylist, songId);
            } else {
                showErrorToast("Wybierz najpierw playlistę");
            }
            }}
            onToggleFavorite={async (songId) => {
            if (isAuthenticated) {
                try {
                await handleLike(songId);
                } catch (error) {
                showErrorToast("Wystąpił błąd podczas aktualizacji polubienia");
                }
            } else {
                showErrorToast("Musisz być zalogowany, aby dodać do ulubionych");
            }
            }}
            favorites={new Set()}
        />

4. Komponent SongItem.tsx w folderze app/muzyka/components/songs
    - Dodano funkcjonalność lajkowania analogiczną do RecommendedSongs
    - Zintegrowano z hookiem useLike
    - Dodano wyświetlanie liczby polubień
    - Zsynchronizowano stan z Redux store
    - Dodano obsługę błędów i komunikaty dla użytkownika
    
    Zmiany obejmowały:
    - Wykorzystanie hooka useLike do obsługi lajkowania
    - Dodanie licznika polubień
    - Stylizację przycisku lajkowania
    - Obsługę stanu zalogowania użytkownika
    - Animacje przy interakcji (Framer Motion)
    
    Kod wykorzystuje te same mechanizmy co RecommendedSongs:
    - Redux store do synchronizacji stanu
    - Next-Auth do autoryzacji
    - Wspólny hook useLike
    - Spójny system obsługi błędów

5. Aktualizacja dokumentacji
    - Dodano opis implementacji w SongItem
    - Zaktualizowano listę plików
    - Opisano mechanizm synchronizacji między komponentami
    - Wyjaśniono współdzielenie logiki między komponentami

6.  Pliki, które zostały zmodyfikowane:
        1. src/app/muzyka/components/songs/SongItem.tsx
        - Dodano przycisk lajkowania
        - Zintegrowano z systemem autoryzacji
        - Dodano obsługę liczby polubień

        2. src/app/muzyka/hooks/useLike.ts
        - Bez zmian, wykorzystano istniejącą implementację

        3. src/store/slices/features/songsSlice.ts
        - Bez zmian, wykorzystano istniejące akcje Redux

        Dzięki tej implementacji mamy spójny system lajkowania w całej aplikacji, gdzie:
        - Stan lajków jest synchronizowany między wszystkimi komponentami
        - Interfejs użytkownika jest spójny wizualnie
        - Logika biznesowa jest współdzielona
        - Obsługa błędów jest jednolita

        kod:            </div>
      </div>
          <motion.button
      <div className="flex items-center space-x-3">
        {isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(song._id);
            }}
            className={`p-2 rounded-full ${
              song.isLiked 
                ? "text-red-500" 
                : "text-gray-500 hover:text-red-500 hover:bg-red-50"
            }`}
            title={song.isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          >
            <FaHeart className="text-xl" />
            <span className="ml-1 text-sm">
              {song.likesCount || 0}
            </span>
          </motion.button>
        )}
        {isPlaylistExpanded && expandedPlaylist && hasPlaylists && (

7. # System lajkowania w aplikacji muzycznej

## Komponenty i funkcjonalności

### 1. Hook useLike.ts (app/muzyka/hooks)
- Główny hook obsługujący logikę lajkowania
- Integracja z Redux i Next-Auth
- Obsługa błędów i autoryzacji
- Współdzielony między wszystkimi komponentami

### 2. Slice Redux (store/slices/features/songsSlice.ts)
- Akcja asynchroniczna toggleLike
- Komunikacja z API
- Obsługa błędów HTTP
- Centralne zarządzanie stanem lajków

### 3. Komponenty wykorzystujące system lajków:

#### SongControls.tsx
- Obsługa lajkowania w widoku siatki
- Animacje przycisków (Framer Motion)
- Synchronizacja z Redux store
- Wyświetlanie liczby polubień

#### SongItem.tsx
- Funkcjonalność lajkowania w widoku listy
- Integracja z hookiem useLike
- Stylizacja i animacje
- Licznik polubień

#### RecommendedSongs.tsx
- Lajkowanie w sekcji rekomendacji
- Spójna implementacja z pozostałymi komponentami
- Współdzielona logika biznesowa

## Implementacja

### Kluczowe mechanizmy:
1. Jednolity system zarządzania stanem (Redux)
2. Spójna autoryzacja (Next-Auth)
3. Współdzielony hook useLike
4. Zunifikowany interfejs użytkownika

### Obsługa błędów:
- Walidacja autoryzacji
- Obsługa błędów API
- Przywracanie stanu w przypadku błędu
- Komunikaty dla użytkownika

### Synchronizacja:
- Stan przechowywany w Redux store
- Automatyczna aktualizacja wszystkich komponentów
- Spójna prezentacja stanu w UI

## Pliki źródłowe:
1. src/app/muzyka/hooks/useLike.ts
2. src/store/slices/features/songsSlice.ts
3. src/app/muzyka/components/songs/SongControls.tsx
4. src/app/muzyka/components/songs/SongItem.tsx
5. src/app/muzyka/components/RecommendedSongs.tsx

                const handleLike = useCallback(async (songId: string) => {
                if (!songId) return;
                
                if (status === 'unauthenticated') {
                await signIn();
                return;
                }
                
                if (!session?.user?.email) {
                console.error('No user email in session');
                return;
                }
                
                try {
                const result = await dispatch(toggleLike(songId)).unwrap();
                return result;
                } catch (error: any) {
                console.error('Error toggling like:', error);
                throw error;
                }
            }, [dispatch, session, status]);
            ------------------------------------------------------------------------------------------
            return { handleLike };
            };
                                switch (response.status) {
                    case 401:
                        errorMessage = 'Brak uprawnień do usunięcia utworu';
                        break;
                    case 403:
                        errorMessage = 'Dostęp zabroniony';
                        break;
                    case 404:
                        errorMessage = 'Nie znaleziono utworu do usunięcia';
                        break;
                    case 500:
                        errorMessage = 'Błąd serwera podczas usuwania utworu';
                        break;
                    default:
                        errorMessage = errorData.message || errorMessage;
                    }
                    -------------------------------------------------------------------------------

                    return rejectWithValue({
                    status: response.status,
                    message: errorMessage,
                    details: errorData.details || null
                    });
                }

                const data = await response.json();
                await dispatch(fetchSongs());
                return data;
                } catch (error: any) {
                return rejectWithValue({
                    status: 500,
                    message: 'Wystąpił nieoczekiwany błąd podczas usuwania utworu',
                    details: error.message
                });
                }
            }
            );
            // Akcja do ustawiania indeksu aktualnie odtwarzanej piosenki
            export const setCurrentSongIndex = createAction<number>('songs/setCurrentSongIndex');

            // Asynchroniczna akcja do aktualizacji playlist piosenek
            export const updateSongsPlaylists = createAsyncThunk(
            'songs/updateSongsPlaylists',
            async (payload: { songIds: string[]; playlistId: string; playlistName: string; remove?: boolean }, thunkAPI) => {
                // Tutaj powinna być implementacja aktualizacji playlist

            ------------------------------------------------------------------------------------
            const handleFavoriteClick = async (e: React.MouseEvent) => {
                e.stopPropagation();
                
                if (!isAuthenticated) {
                return;
                }
                    <button
                try {
                await handleLike(songId);
                } catch (error) {
                console.error('Error handling like:', error);
                }
            };

