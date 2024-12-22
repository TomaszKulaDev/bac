import { NewsItem } from "./types";

// Funkcja pomocnicza do podziału newsów
export const splitNewsData = (allNews: NewsItem[]) => {
  // Sortujemy wszystkie newsy od najnowszych do najstarszych
  const sortedNews = [...allNews].sort((a, b) => {
    return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
  });

  // Pierwsze 10 newsów idzie do głównej siatki
  const newsGridData = sortedNews.slice(0, 10);

  // Pozostałe newsy idą do topicsData
  const topicsData = sortedNews.slice(10);

  return {
    newsGridData,
    topicsData,
  };
};

// Przykład użycia:
const allNewsData: NewsItem[] = [
  {
    id: "1",
    title: "Światowy Festiwal Bachaty ogłasza nowe gwiazdy",
    image: "/images/bachata-festival.jpg", 
    url: "swiatowy-festiwal-bachaty-2024",
    category: "WYDARZENIA",
    isHighlighted: true,
    date: "2024-03-15T10:00:00Z",
  },
  {
    id: "2", 
    title: "Daniel i Desiree prezentują nowy kurs online",
    image: "/images/daniel-desiree-course.jpg",
    url: "daniel-desiree-nowy-kurs",
    category: "EDUKACJA",
    date: "2024-03-14T15:30:00Z",
  },
  {
    id: "3",
    title: "Ataca y La Alemana na Warsaw Bachata Festival",
    image: "/images/ataca-alemana-warsaw.jpg",
    url: "ataca-alemana-warsaw-2024",
    category: "WYDARZENIA",
    isHighlighted: true,
    date: "2024-03-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Nowa płyta Romeo Santos bije rekordy popularności",
    image: "/images/romeo-santos-album.jpg",
    url: "romeo-santos-nowa-plyta",
    category: "MUZYKA",
    date: "2024-03-12T14:20:00Z",
  },
  {
    id: "5",
    title: "Prince Royce zapowiada trasę koncertową w Europie",
    image: "/images/prince-royce-tour.jpg",
    url: "prince-royce-europa-2024",
    category: "MUZYKA",
    isHighlighted: true,
    date: "2024-03-11T11:45:00Z",
  },
  {
    id: "6",
    title: "Korona Królowych Bachaty - nowy konkurs taneczny",
    image: "/images/bachata-queens.jpg",
    url: "korona-krolow-bachaty-2024",
    category: "KONKURSY",
    date: "2024-03-10T16:30:00Z",
  },
  {
    id: "7",
    title: "Nowe studio bachaty otwarte w Warszawie",
    image: "/images/new-studio-warsaw.jpg",
    url: "nowe-studio-warszawa",
    category: "LOKALNE",
    date: "2024-03-09T13:00:00Z",
  },
  {
    id: "8",
    title: "Juan Luis Guerra - premiera nowego teledysku",
    image: "/images/juan-luis-guerra-video.jpg",
    url: "juan-luis-guerra-teledysk",
    category: "MUZYKA",
    date: "2024-03-08T10:20:00Z",
  },
  {
    id: "9",
    title: "Międzynarodowy Dzień Bachaty - światowe obchody",
    image: "/images/bachata-day.jpg",
    url: "dzien-bachaty-2024",
    category: "WYDARZENIA",
    isHighlighted: true,
    date: "2024-03-07T08:45:00Z",
  },
  {
    id: "10",
    title: "Nowe trendy w bachacie - analiza ekspertów",
    image: "/images/bachata-trends.jpg",
    url: "trendy-bachata-2024",
    category: "ARTYKUŁY",
    date: "2024-03-06T17:15:00Z",
  },
  {
    id: "11",
    title: "Bachata Masters Cup - wyniki eliminacji",
    image: "/images/masters-cup.jpg",
    url: "masters-cup-eliminacje",
    category: "KONKURSY",
    date: "2024-03-05T12:30:00Z",
  },
  {
    id: "12",
    title: "Toby Love ogłasza współpracę z polskim artystą",
    image: "/images/toby-love-collab.jpg",
    url: "toby-love-polska-wspolpraca",
    category: "MUZYKA",
    date: "2024-03-04T14:50:00Z",
  },
  {
    id: "13",
    title: "Summer Bachata Festival - pierwsze szczegóły",
    image: "/images/summer-festival.jpg",
    url: "summer-bachata-festival",
    category: "WYDARZENIA",
    isHighlighted: true,
    date: "2024-03-03T09:00:00Z",
  },
  {
    id: "14",
    title: "Warsztaty z gwiazdami - zapisy ruszyły",
    image: "/images/star-workshops.jpg",
    url: "warsztaty-gwiazdy-2024",
    category: "EDUKACJA",
    date: "2024-03-02T15:40:00Z",
  },
  {
    id: "15",
    title: "Nowy styl bachaty podbija social media",
    image: "/images/new-style-viral.jpg",
    url: "nowy-styl-bachaty-viral",
    category: "TRENDY",
    date: "2024-03-01T11:25:00Z",
  },
  {
    id: "16",
    title: "Aventura - nieoczekiwany powrót legendy",
    image: "/images/aventura-return.jpg",
    url: "aventura-powrot-2024",
    category: "MUZYKA",
    isHighlighted: true,
    date: "2024-02-29T16:20:00Z",
  },
  {
    id: "17",
    title: "Konkurs dla początkujących tancerzy",
    image: "/images/beginners-competition.jpg",
    url: "konkurs-poczatkujacy-2024",
    category: "KONKURSY",
    date: "2024-02-28T13:10:00Z",
  },
  {
    id: "18",
    title: "Bachata w programie Mam Talent",
    image: "/images/got-talent-bachata.jpg",
    url: "bachata-mam-talent",
    category: "MEDIA",
    date: "2024-02-27T18:30:00Z",
  },
  {
    id: "19",
    title: "Nowa kolekcja butów do bachaty",
    image: "/images/bachata-shoes.jpg",
    url: "nowe-buty-bachata",
    category: "PRODUKTY",
    date: "2024-02-26T10:45:00Z",
  },
  {
    id: "20",
    title: "Wywiad z legendą bachaty - ekskluzywnie",
    image: "/images/legend-interview.jpg",
    url: "wywiad-legenda-bachaty",
    category: "WYWIADY",
    isHighlighted: true,
    date: "2024-02-25T12:00:00Z",
  },
  // ... reszta newsów
];

// Automatyczny podział newsów
export const { newsGridData, topicsData } = splitNewsData(allNewsData);
