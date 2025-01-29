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
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]: "Jan Kowalski & Anna Wiśniewska",
  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: "Anna Wiśniewska",
  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: "Marcin Nowak",
  [INSTRUCTOR_KEYS.DEMETRIO_NICOLE]: "Demetrio Rosario & Nicole Thompson",
  [INSTRUCTOR_KEYS.TOMASZ_KULA]: "Jan Kowalski",
  [INSTRUCTOR_KEYS.LUIS_ANDREA]: "Luis Garcia & Andrea Cobos",
  [INSTRUCTOR_KEYS.GERO_VIVIAN]: "Gero Rangel & Ling Vivian",
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
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]: {
    id: INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA],
    title: "Certyfikowani instruktorzy bachaty",
    bio: "Doświadczeni instruktorzy z ponad 10-letnim stażem w nauczaniu bachaty.",
    specialization: ["Bachata Dominicana", "Bachata Moderna", "Bachata Sensual"],
    partners: [
      {
        name: "Jan Kowalski",
        role: "leader",
        avatar: "/images/instructors/jan-kowalski.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/jan.bachata"
          },
          {
            platform: "Facebook",
            url: "https://facebook.com/jan.bachata"
          }
        ]
      },
      {
        name: "Anna Wiśniewska",
        role: "follower", 
        avatar: "/images/instructors/anna-wisniewska.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/anna.bachata"
          },
          {
            platform: "YouTube",
            url: "https://youtube.com/@anna.bachata"
          }
        ]
      }
    ],
    rating: 4.9,
    totalStudents: 1200
  },

  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: {
    id: INSTRUCTOR_KEYS.ANNA_WISNIEWSKA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.ANNA_WISNIEWSKA],
    title: "Instruktor bachaty",
    bio: "Mistrzyni Polski w bachacie, instruktorka od 8 lat",
    specialization: ["Bachata Sensual", "Bachata Moderna"],
    avatar: "/images/instructors/anna-wisniewska.jpg",
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://instagram.com/anna.bachata"
      }
    ],
    rating: 4.95,
    totalStudents: 2000
  },

  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: {
    id: INSTRUCTOR_KEYS.MARCIN_NOWAK,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.MARCIN_NOWAK],
    title: "Instruktor bachaty i salsy",
    bio: "Międzynarodowy instruktor bachaty, zwycięzca World Bachata Masters 2022",
    specialization: ["Bachata Moderna", "Bachata Fusion", "Salsa"],
    avatar: "/images/instructors/marcin-nowak.jpg",
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://instagram.com/marcin.bachata"
      }
    ],
    rating: 5.0,
    totalStudents: 3000
  },

  [INSTRUCTOR_KEYS.DEMETRIO_NICOLE]: {
    id: INSTRUCTOR_KEYS.DEMETRIO_NICOLE,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.DEMETRIO_NICOLE],
    title: "Międzynarodowi instruktorzy bachaty",
    bio: "Międzynarodowi instruktorzy bachaty, zwycięzcy World Bachata Masters 2023",
    specialization: ["Bachata Moderna", "Bachata Sensual"],
    partners: [
      {
        name: "Demetrio Rosario",
        role: "leader",
        avatar: "/images/instructors/demetrio.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/demetrio.bachata"
          }
        ]
      },
      {
        name: "Nicole Thompson",
        role: "follower",
        avatar: "/images/instructors/nicole.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/nicole.bachata"
          }
        ]
      }
    ],
    rating: 5.0,
    totalStudents: 5000
  },

  [INSTRUCTOR_KEYS.TOMASZ_KULA]: {
    id: INSTRUCTOR_KEYS.TOMASZ_KULA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.TOMASZ_KULA],
    title: "Instruktor tańca towarzyskiego i bachaty",
    bio: "Doświadczony instruktor z 15-letnim stażem w nauczaniu tańca",
    specialization: ["Bachata Moderna", "Taniec Towarzyski"],
    avatar: "/images/instructors/tomasz-kula.jpg",
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://instagram.com/tomasz.kula.dance"
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/tomasz.kula.dance"
      }
    ],
    rating: 4.8,
    totalStudents: 1800
  },

  [INSTRUCTOR_KEYS.LUIS_ANDREA]: {
    id: INSTRUCTOR_KEYS.LUIS_ANDREA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.LUIS_ANDREA],
    title: "Międzynarodowi instruktorzy bachaty z Dominikany",
    bio: "Pochodzący z Dominikany duet instruktorski z ponad 15-letnim doświadczeniem",
    specialization: ["Bachata Dominicana", "Bachata Moderna"],
    partners: [
      {
        name: "Luis Garcia",
        role: "leader",
        avatar: "/images/instructors/luis-garcia.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/luis.bachata"
          },
          {
            platform: "Facebook",
            url: "https://facebook.com/luis.bachata"
          }
        ]
      },
      {
        name: "Andrea Cobos",
        role: "follower",
        avatar: "/images/instructors/andrea-cobos.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/andrea.bachata"
          },
          {
            platform: "YouTube",
            url: "https://youtube.com/@andrea.bachata"
          }
        ]
      }
    ]
  },

  [INSTRUCTOR_KEYS.GERO_VIVIAN]: {
    id: INSTRUCTOR_KEYS.GERO_VIVIAN,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.GERO_VIVIAN],
    title: "Międzynarodowi instruktorzy bachaty sensual",
    bio: "Uznany duet instruktorski specjalizujący się w bachacie sensual, twórcy unikalnego stylu łączącego elementy tańca współczesnego z bachatą",
    specialization: ["Bachata Sensual", "Bachata Moderna", "Contemporary Fusion"],
    partners: [
      {
        name: "Gero Rangel",
        role: "leader",
        avatar: "/images/instructors/gero.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/gero.bachata"
          },
          {
            platform: "YouTube",
            url: "https://youtube.com/@gero.bachata"
          }
        ]
      },
      {
        name: "Ling Vivian",
        role: "follower",
        avatar: "/images/instructors/vivian.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/vivian.bachata"
          },
          {
            platform: "Facebook",
            url: "https://facebook.com/vivian.bachata"
          }
        ]
      }
    ],
    rating: 5.0,
    totalStudents: 10000
  }
};
