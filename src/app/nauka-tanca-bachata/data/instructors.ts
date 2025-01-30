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
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]:
    "Jan Kowalski & Anna Wiśniewska",
  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: "Anna Wiśniewska",
  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: "Marcin Nowak",
  [INSTRUCTOR_KEYS.DEMETRIO_NICOLE]: "Demetrio Rosario & Nicole Thompson",
  [INSTRUCTOR_KEYS.TOMASZ_KULA]: "Jan Kowalski",
  [INSTRUCTOR_KEYS.LUIS_ANDREA]: "Luis Garcia & Andrea Cobos",
  [INSTRUCTOR_KEYS.GERO_VIVIAN]: "Gero Rangel & Ling Vivian",
  [INSTRUCTOR_KEYS.SO_KAYKA]: "So Kayka",
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
    specialization: [
      "Bachata Dominicana",
      "Bachata Moderna",
      "Bachata Sensual",
    ],
    partners: [
      {
        name: "Jan Kowalski",
        role: "leader",
        avatar: "/images/instructors/jan-kowalski.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/jan.bachata",
          },
          {
            platform: "Facebook",
            url: "https://facebook.com/jan.bachata",
          },
          {
            platform: "TikTok",
            url: "https://tiktok.com/@jan.bachata",
          },
        ],
      },
      {
        name: "Anna Wiśniewska",
        role: "follower",
        avatar: "/images/instructors/anna-wisniewska.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/anna.bachata",
          },
          {
            platform: "YouTube",
            url: "https://youtube.com/@anna.bachata",
          },
          {
            platform: "TikTok",
            url: "https://tiktok.com/@anna.bachata",
          },
        ],
      },
    ],
    rating: 4.9,
    totalStudents: 1200,
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
        url: "https://instagram.com/anna.bachata",
      },
      {
        platform: "TikTok",
        url: "https://tiktok.com/@anna.bachata",
      },
    ],
    rating: 4.95,
    totalStudents: 2000,
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
        url: "https://instagram.com/marcin.bachata",
      },
      {
        platform: "TikTok",
        url: "https://tiktok.com/@marcin.bachata",
      },
    ],
    rating: 5.0,
    totalStudents: 3000,
  },

  [INSTRUCTOR_KEYS.DEMETRIO_NICOLE]: {
    id: INSTRUCTOR_KEYS.DEMETRIO_NICOLE,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.DEMETRIO_NICOLE],
    title: "Bachata Dance Academy",
    bio:
      "Bachata Dance Academy specializes in teaching Bachata Dancing to everyone and anyone interested in this amazing form of dance.\n\n" +
      "Want to learn to dance Bachata? We have free Bachata Tutorials here on Youtube, Online Courses available at www.BachataDanceAcademyOnline.com and we also teach in person group classes at Stevens Steakhouse, located in Commerce, CA.\n\n" +
      "Our Bachata Video Tutorials feature topics such as Beginner Bachata Partnerwork, Intermediate Bachata Partnerwork, Dominican Bachata & Footwork, Bachata Musicality & Timing, Bachata Body Movement & Isolations, as well as Ladies Bachata Styling.\n\n" +
      "If you are interested in learning, improving, and more cool Bachata Video Tutorials, make sure to subscribe and follow us! :)\n\n" +
      "Our experienced and friendly instructors love to teach and provide students with the best dancing experience as possible. Follow us online or come join us if you live in the Los Angeles Area! :)",
    specialization: ["Bachata Moderna", "Bachata Sensual"],
    partners: [
      {
        name: "Demetrio Rosario",
        role: "leader",
        avatar: "/images/instructors/demetrio.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://www.instagram.com/djsoonaasty",
          },
          {
            platform: "Facebook",
            url: "https://www.facebook.com/demetrio.rosario/",
          },
          {
            platform: "TikTok",
            url: "https://www.tiktok.com/@demetriorosario",
          },
          {
            platform: "Website",
            url: "https://bachatadanceacademyonline.com",
          },
          {
            platform: "Website",
            url: "https://www.bachatadanceacademy.com",
          },
        ],
      },
      {
        name: "Nicole Thompson",
        role: "follower",
        avatar: "/images/instructors/nicole.jpg",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram.com/nicole.bachata",
          },
          {
            platform: "TikTok",
            url: "https://tiktok.com/@nicole.bachata",
          },
        ],
      },
    ],
    rating: 5.0,
    totalStudents: 5000,
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
        url: "https://instagram.com/tomasz.kula.dance",
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/tomasz.kula.dance",
      },
      {
        platform: "TikTok",
        url: "https://tiktok.com/@tomasz.kula.dance",
      },
    ],
    rating: 4.8,
    totalStudents: 1800,
  },

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

  [INSTRUCTOR_KEYS.SO_KAYKA]: {
    id: INSTRUCTOR_KEYS.SO_KAYKA,
    name: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.SO_KAYKA],
    title: "Międzynarodowa instruktorka bachaty",
    bio: "Profesjonalna tancerka i instruktorka specjalizująca się w bachacie sensual i izolacjach",
    specialization: ["Bachata Sensual", "Body Movement", "Isolations"],
    avatar: "/images/instructors/so-kayka.jpg",
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/kayka.sadowska",
      },
      {
        platform: "YouTube",
        url: "https://www.youtube.com/@sokayka",
      },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/imsokayka",
      },
      {
        platform: "Website",
        url: "https://sokayka.my.canva.site/",
      },
    ],
    rating: 4.9,
    totalStudents: 2500,
  },
};
