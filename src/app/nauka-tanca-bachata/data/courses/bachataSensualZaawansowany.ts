import { Course } from "../../types";
import { instructors } from "../instructors";

export const modernaCourse: Course = {
  id: "bachataSensualZaawansowany",
  title: "Bachata Sensual - Zaawansowany",
  description:
    "Zaawansowany kurs dla tancerzy chcących rozwinąć swój styl o elementy sensual. Poznaj skomplikowane kombinacje, tricki i własną interpretację muzyki.",
  level: "advanced",
  totalDuration: "15h 45min",
  instructor: instructors.marcinNowak,
  chapters: [
    {
      id: "rozdzial-1-sensual",
      title: "Muzyczność i interpretacja",
      description:
        "Zaawansowana praca z muzyką i interpretacja w stylu sensual",
      order: 1,
      duration: "4h",
      lessons: [
        {
          id: "lekcja-1-1-moderna-musicality",
          title: "Struktura muzyczna w moderna",
          description:
            "Analiza struktury muzycznej i jej interpretacja w tańcu",
          duration: "45min",
          thumbnail: "/images/lessons/moderna/r1-l1-musicality-thumb.jpg",
          videos: [
            {
              id: "v1-moderna-r1-l1-musicality",
              title: "Struktura muzyczna - widok z przodu",
              description: "Podstawowe elementy struktury muzycznej w moderna",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "front",
              instructor: "Marcin Nowak",
            },
            {
              id: "v2-moderna-r1-l1-musicality",
              title: "Struktura muzyczna - widok z tyłu",
              description: "Analiza kroków i ruchów od tyłu",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "back",
              instructor: "Marcin Nowak",
            },
            {
              id: "v3-moderna-r1-l1-musicality",
              title: "Szczegóły techniczne struktury muzycznej",
              description: "Detale i niuanse techniczne",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "detail",
              instructor: "Marcin Nowak",
            },
          ],
          practiceExercises: [
            {
              id: "ex-moderna-r1-l1-e1",
              title: "Ćwiczenie rytmiki",
              description: "Ćwiczenie podstawowych wzorców rytmicznych",
              duration: "15 min",
              difficulty: "medium",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-1-2-moderna",
          title: "Improwizacja muzyczna",
          description: "Techniki improwizacji i freestyle w moderna",
          duration: "90min",
          thumbnail: "/images/lessons/moderna-improv.jpg",
          videos: [
            {
              id: "v3-moderna",
              title: "Podstawy improwizacji",
              description: "Jak zacząć improwizować w bachacie moderna",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "front",
              instructor: "Marcin Nowak",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-2-moderna",
      title: "Fuzja stylów tanecznych",
      description: "Łączenie bachaty z innymi stylami tańca",
      order: 2,
      duration: "6h",
      lessons: [
        {
          id: "lekcja-2-1-moderna",
          title: "Elementy contemporary",
          description: "Wprowadzanie elementów tańca współczesnego do bachaty",
          duration: "120min",
          thumbnail: "/images/lessons/moderna-contemporary.jpg",
          videos: [
            {
              id: "v4-moderna",
              title: "Podstawy contemporary",
              description: "Techniki contemporary w bachacie",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "front",
              instructor: "Marcin Nowak",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-2-2-moderna",
          title: "Urban style w bachacie",
          description: "Łączenie elementów street dance z bachatą",
          duration: "120min",
          thumbnail: "/images/lessons/moderna-urban.jpg",
          videos: [
            {
              id: "v5-moderna",
              title: "Fuzja ze street dance",
              description: "Jak łączyć style urban z bachatą",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "front",
              instructor: "Marcin Nowak",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-3-moderna",
      title: "Zaawansowane tricki i partnerowanie",
      description: "Skomplikowane figury i techniki partnerowania",
      order: 3,
      duration: "5h 45min",
      lessons: [
        {
          id: "lekcja-3-1-moderna",
          title: "Tricki powietrzne",
          description: "Zaawansowane podnoszenia i elementy akrobatyczne",
          duration: "120min",
          thumbnail: "/images/lessons/moderna-tricks.jpg",
          videos: [
            {
              id: "v6-moderna",
              title: "Bezpieczne podnoszenia",
              description: "Technika i bezpieczeństwo w trickach",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "front",
              instructor: "Marcin Nowak",
            },
            {
              id: "v7-moderna",
              title: "Przygotowanie fizyczne",
              description: "Ćwiczenia przygotowujące do tricków",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "detail",
              instructor: "Marcin Nowak",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-3-2-moderna",
          title: "Choreografia pokazowa",
          description: "Tworzenie własnej choreografii pokazowej",
          duration: "90min",
          thumbnail: "/images/lessons/moderna-choreo.jpg",
          videos: [
            {
              id: "v8-moderna",
              title: "Zasady choreografii",
              description: "Jak tworzyć efektowne choreografie",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              perspective: "front",
              instructor: "Marcin Nowak",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
  ],
  rating: 4.95,
  studentsCount: 120,
  thumbnail: "/images/courses/bachataSensualZaawansowany.webp",
  tags: ["bachata", "sensual", "zaawansowany", "tricki", "choreografia"],
  isPopular: false,
};
