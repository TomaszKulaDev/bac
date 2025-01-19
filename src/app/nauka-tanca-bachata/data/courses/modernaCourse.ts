import { Course } from "../../types";
import { instructors } from "../instructors";
import { SAMPLE_VIDEOS } from "../sampleVideos";

export const modernaCourse: Course = {
  id: "bachata-moderna-advanced",
  title: "Bachata Moderna - Poziom Mistrzowski",
  description:
    "Zaawansowany kurs dla tancerzy chcących rozwinąć swój styl o elementy moderna i fusion. Poznaj skomplikowane kombinacje, tricki i własną interpretację muzyki.",
  level: "advanced",
  totalDuration: "15h 45min",
  instructor: instructors.marcinNowak,
  chapters: [
    {
      id: "rozdzial-1-moderna",
      title: "Muzyczność i interpretacja",
      description:
        "Zaawansowana praca z muzyką i interpretacja w stylu moderna",
      order: 1,
      duration: "4h",
      lessons: [
        {
          id: "lekcja-1-1-moderna",
          title: "Struktura muzyczna w moderna",
          description:
            "Analiza struktury muzycznej i interpretacja instrumentów",
          duration: "90min",
          thumbnail: "/images/lessons/moderna-music.jpg",
          videos: [
            {
              id: "v1-moderna",
              title: "Analiza muzyczna",
              description: "Szczegółowa analiza struktury utworów moderna",
              videoUrl: SAMPLE_VIDEOS.BUNNY,
              perspective: "front",
              instructor: "Marcin Nowak",
            },
            {
              id: "v2-moderna",
              title: "Interpretacja instrumentów",
              description: "Jak interpretować poszczególne instrumenty w tańcu",
              videoUrl: SAMPLE_VIDEOS.SINTEL,
              perspective: "detail",
              instructor: "Marcin Nowak",
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
              videoUrl: SAMPLE_VIDEOS.TEARS,
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
              videoUrl: SAMPLE_VIDEOS.ELEPHANTS,
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
              videoUrl: SAMPLE_VIDEOS.BLAZE,
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
              videoUrl: SAMPLE_VIDEOS.ESCAPE,
              perspective: "front",
              instructor: "Marcin Nowak",
            },
            {
              id: "v7-moderna",
              title: "Przygotowanie fizyczne",
              description: "Ćwiczenia przygotowujące do tricków",
              videoUrl: SAMPLE_VIDEOS.FUN,
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
              videoUrl: SAMPLE_VIDEOS.JOYRIDE,
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
  thumbnail: "/images/courses/moderna-advanced.jpg",
  tags: [
    "bachata",
    "moderna",
    "fusion",
    "zaawansowany",
    "tricki",
    "choreografia",
  ],
  isPopular: false,
};
