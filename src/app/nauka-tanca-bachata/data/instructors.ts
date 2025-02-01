/**
 * Stałe identyfikatory instruktorów używane w kodzie.
 * Służą jako klucze techniczne do:
 * - Nazw plików (zdjęcia, filmy)
 * - Referencji w bazie danych
 * - Budowania URL-i
 * Format: małe litery, myślniki zamiast spacji, bez polskich znaków
 */
import { Instructor } from "../types";

export const INSTRUCTOR_KEYS = {
  JAN_KOWALSKI_ANNA_WISNIEWSKA: "jan-kowalski-and-anna-wisniewska",
  ANNA_WISNIEWSKA: "anna-wisniewska",
  MARCIN_NOWAK: "marcin-nowak",
  DEMETRIO_NICOLE: "demetrio-nicole",
  TOMASZ_KULA: "tomasz-kula",
  LUIS_ANDREA: "luis-andrea",
  GERO_VIVIAN: "gero-vivian",
  SO_KAYKA: "so-kayka",
} as const;

/**
 * Mapowanie kluczy technicznych na nazwy wyświetlane w interfejsie.
 * Te nazwy są używane wszędzie gdzie użytkownik widzi tekst:
 * - W nagłówkach
 * - W opisach
 * - W listach instruktorów
 * Format: Pełne imiona i nazwiska, ze znakami specjalnymi
 */
export const INSTRUCTOR_NAMES = {
 
  [INSTRUCTOR_KEYS.LUIS_ANDREA]: "Luis Garcia & Andrea Cobos",
  [INSTRUCTOR_KEYS.GERO_VIVIAN]: "Gero Rangel & ",
  
} as const;

/**
 * Główny obiekt zawierający pełne dane instruktorów.
 * Każdy instruktor ma ujednoliconą strukturę z następującymi polami:
 * - id: klucz techniczny z INSTRUCTOR_KEYS
 * - name: nazwa wyświetlana z INSTRUCTOR_NAMES
 * - title: tytuł/rola instruktora
 * - bio: krótki opis
 * - specialization: specjalizacje taneczne
 * - partners lub avatar: zdjęcie pojedyncze lub dane partnerów
 * - socialMedia: linki do mediów społecznościowych (opcjonalne)
 * - rating: ocena (1-5) (opcjonalne)
 * - totalStudents: liczba uczniów (opcjonalne)
 */
export const instructors: Record<string, Instructor> = {

  [INSTRUCTOR_KEYS.LUIS_ANDREA]: {
    id: INSTRUCTOR_KEYS.LUIS_ANDREA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.LUIS_ANDREA],
    title: "",
    bio: "We are Bachata teachers because we cherish the freedom and travel it allows. And we teach hundreds of people who share this passion. Luis y Andrea are international bachata artists recognized worldwide. Performance and teaching in 42 countries. ",
    specialization: ["Bachata Dominicana", "Bachata Moderna"],
    partners: [
      {
        name: "Luis Garcia",
        role: "leader",
        avatar: "/images/instructors/luis-garcia.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://www.instagram.com/luis_garciaofficial/",
          },
          {
            platform: "Facebook",
            url: "https://www.facebook.com/luisyandreaspainpage",
          },
          {
            platform: "TikTok",
            url: "https://www.tiktok.com/@luisyandreaoficial",
          },
          {
            platform: "Website",
            url: "https://www.dancesurfing.com/",
          },
        ],
      },
      {
        name: "Andrea Cobos",
        role: "follower",
        avatar: "/images/instructors/andrea-cobos.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://www.instagram.com/andreacobos.oficial/",
          },
          {
            platform: "YouTube",
            url: "https://www.youtube.com/@LuisyAndreaOfficial",
          },
          {
            platform: "TikTok",
            url: "https://www.tiktok.com/@luisyandreaoficial",
          },
          {
            platform: "Website",
            url: "https://www.dancesurfing.com/",
          },
        ],
      },
    ],
  },

  [INSTRUCTOR_KEYS.GERO_VIVIAN]: {
    id: INSTRUCTOR_KEYS.GERO_VIVIAN,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.GERO_VIVIAN],
    title: "Międzynarodowi instruktorzy bachaty sensual",
    bio: "Uznany duet instruktorski specjalizujący się w bachacie sensual, twórcy unikalnego stylu łączącego elementy tańca współczesnego z bachatą",
    specialization: [
      "Bachata Sensual",
      "Bachata Moderna",
      "Contemporary Fusion",
    ],
    partners: [
      {
        name: "Gero Rangel",
        role: "leader",
        avatar: "/images/instructors/gero.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://www.instagram.com/gero_dance/",
          },
          {
            platform: "YouTube",
            url: "https://www.youtube.com/c/GeroyMigl%C4%97",
          },
          {
            platform: "TikTok",
            url: "https://www.tiktok.com/@gero_dance",
          },
          {
            platform: "Website",
            url: "https://www.geroymigle.com/",
          },
        ],
      },
      {
        name: "Ling Vivian",
        role: "follower",
        avatar: "/images/instructors/vivian.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://www.instagram.com/lingvivian7929/",
          },
          {
            platform: "Facebook",
            url: "https://www.facebook.com/profile.php?id=100006735127711",
          },
        ],
      },
    ],
    rating: 5.0,
    totalStudents: 10000,
  },

};
