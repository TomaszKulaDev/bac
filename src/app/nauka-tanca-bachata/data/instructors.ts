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
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]:
    "Jan Kowalski & Anna Wiśniewska",
  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: "Anna Wiśniewska",
  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: "Marcin Nowak",
  [INSTRUCTOR_KEYS.DEMETRIO_NICOLE]: "Demetrio Rosario & Nicole Thompson",
  [INSTRUCTOR_KEYS.TOMASZ_KULA]: "Jan Kowalski",
  [INSTRUCTOR_KEYS.LUIS_ANDREA]: "Luis Garcia & Andrea Cobos",
  [INSTRUCTOR_KEYS.GERO_VIVIAN]: "Gero Rangel & Ling Vivian",
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
  [INSTRUCTOR_KEYS.LUIS_ANDREA]: {
    id: INSTRUCTOR_KEYS.LUIS_ANDREA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.LUIS_ANDREA],
    title: "Międzynarodowi instruktorzy bachaty z Dominikany",
    avatar: `/images/instructors/${INSTRUCTOR_KEYS.LUIS_ANDREA}.jpg`,
    bio: "Pochodzący z Dominikany duet instruktorski z ponad 15-letnim doświadczeniem w nauczaniu bachaty na całym świecie",
    specialization: ["Bachata Dominicana", "Bachata Moderna", "Bachata Fusion"],
    rating: 5.0,
    totalStudents: 8000,
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://instagram.com/luis.andrea.bachata",
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/luis.andrea.bachata",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/@luis.andrea.bachata",
      },
    ],
  },
  [INSTRUCTOR_KEYS.GERO_VIVIAN]: {
    id: INSTRUCTOR_KEYS.GERO_VIVIAN,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.GERO_VIVIAN],
    title: "Międzynarodowi instruktorzy bachaty sensual",
    avatar: `/images/instructors/${INSTRUCTOR_KEYS.GERO_VIVIAN}.jpg`,
    bio: "Uznany duet instruktorski specjalizujący się w bachacie sensual, twórcy unikalnego stylu łączącego elementy tańca współczesnego z bachatą",
    specialization: [
      "Bachata Sensual",
      "Bachata Moderna",
      "Contemporary Fusion",
    ],
    rating: 5.0,
    totalStudents: 10000,
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://instagram.com/gero.vivian",
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/gero.vivian.bachata",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/@gero.vivian",
      },
    ],
  },
};
