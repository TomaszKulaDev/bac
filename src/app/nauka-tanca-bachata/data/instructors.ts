/**
 * Stałe identyfikatory instruktorów używane w kodzie.
 * Służą jako klucze techniczne do:
 * - Nazw plików (zdjęcia, filmy)
 * - Referencji w bazie danych
 * - Budowania URL-i
 * Format: małe litery, myślniki zamiast spacji, bez polskich znaków
 */
export const INSTRUCTOR_KEYS = {
  JAN_KOWALSKI_ANNA_WISNIEWSKA: "jan-kowalski-and-anna-wisniewska",
  ANNA_WISNIEWSKA: "anna-wisniewska",
  MARCIN_NOWAK: "marcin-nowak",
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
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]:
    "Jan Kowalski & Anna Wiśniewska",
  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: "Anna Wiśniewska",
  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: "Marcin Nowak",
} as const;

/**
 * Główny obiekt zawierający pełne dane instruktorów.
 * Każdy instruktor ma:
 * - id: klucz techniczny z INSTRUCTOR_KEYS
 * - name: nazwa wyświetlana z INSTRUCTOR_NAMES
 * - avatar: ścieżka do zdjęcia profilowego
 * - bio: krótki opis
 * - specialization: specjalizacje taneczne
 * - rating: ocena (1-5)
 * - totalStudents: liczba uczniów
 */
export const instructors = {
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]: {
    id: INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA],
    avatar: `/images/instructors/${INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA}.jpg`,
    bio: "Profesjonalny instruktor tańca z 10-letnim doświadczeniem",
    specialization: ["bachata", "salsa"],
    rating: 4.9,
    totalStudents: 1500,
  },
  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: {
    id: INSTRUCTOR_KEYS.ANNA_WISNIEWSKA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.ANNA_WISNIEWSKA],
    avatar: "/images/instructors/anna-wisniewska.jpg",
    bio: "Mistrzyni Polski w bachacie, instruktorka od 8 lat",
    specialization: ["bachata", "sensual"],
    rating: 4.95,
    totalStudents: 2000,
  },
  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: {
    id: "3",
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.MARCIN_NOWAK],
    avatar: "/images/instructors/marcin-nowak.jpg",
    bio: "Międzynarodowy instruktor bachaty, zwycięzca World Bachata Masters 2022",
    specialization: ["bachata", "moderna", "fusion"],
    rating: 5.0,
    totalStudents: 3000,
  },
};
