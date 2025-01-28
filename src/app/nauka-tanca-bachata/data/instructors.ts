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
  DEMETRIO_NICOLE: "demetrio-and-nicole",
  TOMASZ_KULA: "tomasz-kula",
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
  [INSTRUCTOR_KEYS.DEMETRIO_NICOLE]: "Demetrio Rosario & Nicole Thompson",
  [INSTRUCTOR_KEYS.TOMASZ_KULA]: "Tomasz Kula",
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
export const instructors: Record<string, Instructor> = {
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]: {
    id: INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA],
    title: "Certyfikowani instruktorzy bachaty",
    avatar: "/images/instructors/jan-anna.jpg",
    bio: "Doświadczeni instruktorzy z ponad 10-letnim stażem w nauczaniu bachaty.",
    specialization: [
      "Bachata Dominicana",
      "Bachata Moderna",
      "Bachata Sensual",
    ],
    rating: 4.9,
    totalStudents: 1200,
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://instagram.com/jan.anna.bachata",
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/jan.anna.bachata",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/@jan.anna.bachata",
      },
    ],
  },
  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: {
    id: INSTRUCTOR_KEYS.ANNA_WISNIEWSKA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.ANNA_WISNIEWSKA],
    title: "Instruktor bachaty",
    avatar: "/images/instructors/anna-wisniewska.jpg",
    bio: "Mistrzyni Polski w bachacie, instruktorka od 8 lat",
    specialization: ["bachata", "sensual"],
    rating: 4.95,
    totalStudents: 2000,
  },
  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: {
    id: INSTRUCTOR_KEYS.MARCIN_NOWAK,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.MARCIN_NOWAK],
    title: "Instruktor bachaty i salsy",
    avatar: "/images/instructors/marcin-nowak.jpg",
    bio: "Międzynarodowy instruktor bachaty, zwycięzca World Bachata Masters 2022",
    specialization: ["bachata", "moderna", "fusion"],
    rating: 5.0,
    totalStudents: 3000,
  },
  [INSTRUCTOR_KEYS.DEMETRIO_NICOLE]: {
    id: INSTRUCTOR_KEYS.DEMETRIO_NICOLE,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.DEMETRIO_NICOLE],
    title: "Międzynarodowi instruktorzy bachaty",
    avatar: `/images/instructors/${INSTRUCTOR_KEYS.DEMETRIO_NICOLE}.jpg`,
    bio: "Międzynarodowi instruktorzy bachaty, zwycięzcy World Bachata Masters 2023",
    specialization: ["bachata", "moderna", "sensual"],
    rating: 5.0,
    totalStudents: 5000,
  },
  [INSTRUCTOR_KEYS.TOMASZ_KULA]: {
    id: INSTRUCTOR_KEYS.TOMASZ_KULA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.TOMASZ_KULA],
    title:
      "Słyszeliście o facecie, który nauczył się bachaty z YouTube'a? 😂 Cóż pokaże Ci na co zwrocic uwage. Tzn nie ja bo nie jestem instruktorem, ale wiem kto umie i robi to dobrze. 😎 ",
    avatar: "/images/instructors/tomasz-kula.jpg",
    bio: "Doświadczony instruktor z 15-letnim stażem w nauczaniu tańca",
    specialization: ["bachata", "taniec towarzyski", "moderna"],
    rating: 4.8,
    totalStudents: 1800,
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://instagram.com/tomasz.kula.dance",
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/tomasz.kula.dance",
      },
    ],
  },
};
