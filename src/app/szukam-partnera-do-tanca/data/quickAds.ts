export interface QuickAd {
  id: string;
  type: "practice" | "social" | "course" | "other";
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  author: {
    name: string;
    level: string;
    avatar?: string;
  };
  createdAt: string;
  expiresAt: string;
}

export const quickAds: QuickAd[] = [
  // Poprzednie ogłoszenia
  {
    id: "1",
    type: "practice",
    title: "Szukam partnera na praktis",
    description:
      "Praktis bachaty, poziom średniozaawansowany. Sala już opłacona.",
    date: "2024-03-15",
    time: "18:00-20:00",
    location: "Warszawa, Studio Tańca XYZ",
    author: {
      name: "Anna K.",
      level: "Średniozaawansowany",
      avatar: "/images/profiles/avatar1.jpg",
    },
    createdAt: "2024-03-10T12:00:00Z",
    expiresAt: "2024-03-15T20:00:00Z",
  },
  {
    id: "2",
    type: "practice",
    title: "Praktis figur z kursu",
    description:
      "Chcę przećwiczyć figury z ostatniego kursu P2. Mam dostęp do sali z lustrami.",
    date: "2024-03-18",
    time: "17:30-19:00",
    location: "Łódź, Szkoła Tańca Ritmo",
    author: {
      name: "Marek L.",
      level: "Początkujący+",
      avatar: "/images/profiles/avatar8.jpg",
    },
    createdAt: "2024-03-14T08:00:00Z",
    expiresAt: "2024-03-18T17:30:00Z",
  },
  {
    id: "3",
    type: "social",
    title: "Latino Night w Soho",
    description:
      "Szukam partnerki na cotygodniowe wyjścia do Soho. Głównie bachata i salsa.",
    date: "2024-03-19",
    time: "21:00-01:00",
    location: "Soho Club, Katowice",
    author: {
      name: "Robert W.",
      level: "Średniozaawansowany",
      avatar: "/images/profiles/avatar9.jpg",
    },
    createdAt: "2024-03-15T14:20:00Z",
    expiresAt: "2024-03-19T21:00:00Z",
  },
  {
    id: "4",
    type: "course",
    title: "Partner na kurs Lady Styling",
    description:
      "Szukam partnera do asysty na kursie Lady Styling. Mile widziane osoby z doświadczeniem.",
    date: "2024-03-21",
    time: "18:30-20:00",
    location: "Szczecin Dance Studio",
    author: {
      name: "Natalia P.",
      level: "Zaawansowany",
      avatar: "/images/profiles/avatar10.jpg",
    },
    createdAt: "2024-03-16T11:30:00Z",
    expiresAt: "2024-03-21T18:30:00Z",
  },
  {
    id: "5",
    type: "other",
    title: "Szukam stałego partnera",
    description:
      "Poszukuję stałego partnera do regularnych wyjść na sociale i praktisy. Poziom INT.",
    date: "2024-03-31",
    time: "Elastyczne godziny",
    location: "Bydgoszcz",
    author: {
      name: "Magda S.",
      level: "Średniozaawansowany",
      avatar: "/images/profiles/avatar11.jpg",
    },
    createdAt: "2024-03-01T00:00:00Z",
    expiresAt: "2024-03-31T23:59:59Z",
  },
  {
    id: "6",
    type: "practice",
    title: "Praktis przed zawodami",
    description:
      "Przygotowania do zawodów Bachata Stars. Potrzebuję partnerki na intensywne treningi.",
    date: "2024-03-22",
    time: "16:00-19:00",
    location: "Białystok, Elite Dance",
    author: {
      name: "Adam K.",
      level: "Zaawansowany+",
      avatar: "/images/profiles/avatar12.jpg",
    },
    createdAt: "2024-03-17T09:45:00Z",
    expiresAt: "2024-03-22T16:00:00Z",
  },
  {
    id: "7",
    type: "social",
    title: "Bachata Night w Cubano",
    description:
      "Organizuję grupę na wieczór bachatowy. Szukamy 3 par do wspólnego stolika.",
    date: "2024-03-23",
    time: "20:00-02:00",
    location: "El Cubano, Warszawa",
    author: {
      name: "Karolina M.",
      level: "Średniozaawansowany",
      avatar: "/images/profiles/avatar13.jpg",
    },
    createdAt: "2024-03-18T16:00:00Z",
    expiresAt: "2024-03-23T20:00:00Z",
  },
  {
    id: "8",
    type: "course",
    title: "Warsztaty z Danielem i Desirée",
    description:
      "Szukam partnera na intensywne warsztaty z mistrzami świata. Wymagany poziom INT/ADV.",
    date: "2024-04-13",
    time: "10:00-18:00",
    location: "Kraków, Akademia Tańca",
    author: {
      name: "Julia W.",
      level: "Zaawansowany",
      avatar: "/images/profiles/avatar14.jpg",
    },
    createdAt: "2024-03-01T12:00:00Z",
    expiresAt: "2024-04-13T10:00:00Z",
  },
  {
    id: "9",
    type: "other",
    title: "Nagranie do YouTube",
    description:
      "Szukam partnerki do nagrania choreografii na YouTube. Styl: Bachata Sensual.",
    date: "2024-03-24",
    time: "14:00-17:00",
    location: "Wrocław, Studio Filmowe",
    author: {
      name: "Paweł R.",
      level: "Zaawansowany+",
      avatar: "/images/profiles/avatar15.jpg",
    },
    createdAt: "2024-03-19T13:15:00Z",
    expiresAt: "2024-03-24T14:00:00Z",
  },
];
