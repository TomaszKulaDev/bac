import { Course } from "../../types";
import { instructors } from "../instructors";

export const isolationCourse: Course = {
  id: "bachata-body-isolation",
  title: "Izolacje w Bachacie - Nie bądź drewnem",
  description:
    "Zaawansowany kurs techniki izolacji ciała w bachacie. Naucz się kontrolować każdą część ciała niezależnie, tworząc płynne i efektowne ruchy.",
  level: "isolations",
  totalDuration: "8 godz 30min",
  instructor: instructors.annaWisniewska,
  chapters: [
    {
      id: "rozdzial-1-isolation",
      title: "Podstawy izolacji",
      description:
        "Wprowadzenie do technik izolacji poszczególnych części ciała",
      order: 1,
      duration: "2 godz 30min",
      lessons: [
        {
          id: "lekcja-1-1-isolation-hips",
          title: "Izolacja bioder",
          description: "Techniki izolacji bioder w ruchu i w miejscu",
          duration: "45min",
          thumbnail: "/images/lessons/isolation/r1-l1-hips-thumb.jpg",
          videos: [
            {
              id: "v1-isolation-r1-l1-hips",
              title: "Izolacja bioder - widok z przodu",
              description: "Podstawowe techniki izolacji bioder",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
              perspective: "front",
              instructor: "Kajka",
            },
            // {
            //   id: "v2-isolation-r1-l1-hips",
            //   title: "Izolacja bioder - widok z tyłu",
            //   description: "Analiza ruchu bioder z tyłu",
            //   videoUrl:
            //     "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            //   perspective: "back",
            //   instructor: "Ola",
            // },
            // {
            //   id: "v3-isolation-r1-l1-hips",
            //   title: "Szczegóły techniczne izolacji bioder",
            //   description: "Detale i niuanse techniczne ruchów bioder",
            //   videoUrl:
            //     "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            //   perspective: "detail",
            //   instructor: "Tesi",
            // },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-1-2-isolation",
          title: "Izolacja klatki piersiowej",
          description: "Techniki izolacji górnej części ciała",
          duration: "45min",
          thumbnail: "/images/lessons/chest-isolation.jpg",
          videos: [
            {
              id: "v2-isolation",
              title: "Izolacja klatki piersiowej",
              description: "Podstawowe ruchy i techniki",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
              perspective: "front",
              instructor: "Anna Wiśniewska",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-2-isolation",
      title: "Zaawansowane techniki",
      description: "Łączenie izolacji różnych części ciała",
      order: 2,
      duration: "3 godz",
      lessons: [
        {
          id: "lekcja-2-1-isolation",
          title: "Wielopoziomowe izolacje",
          description: "Łączenie izolacji bioder, klatki i ramion",
          duration: "60min",
          thumbnail: "/images/lessons/multi-isolation.jpg",
          videos: [
            {
              id: "v3-isolation",
              title: "Kombinacje izolacji",
              description: "Zaawansowane kombinacje ruchów",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              perspective: "front",
              instructor: "Anna Wiśniewska",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-3-isolation",
      title: "Izolacje w tańcu",
      description: "Praktyczne zastosowanie izolacji w tańcu",
      order: 3,
      duration: "3 godz",
      lessons: [
        {
          id: "lekcja-3-1-isolation",
          title: "Izolacje w podstawowych figurach",
          description: "Implementacja technik izolacji w figurach tanecznych",
          duration: "60min",
          thumbnail: "/images/lessons/dance-isolation.jpg",
          videos: [
            {
              id: "v4-isolation",
              title: "Izolacje w praktyce",
              description: "Wykorzystanie izolacji w tańcu",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
              perspective: "front",
              instructor: "Anna Wiśniewska",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
  ],
  rating: 4.85,
  studentsCount: 250,
  thumbnail: "/images/courses/body-isolation.webp",
  tags: [
    "bachata",
    "izolacje",
    "technika",
    "body movement",
    "izolacje",
    "styl",
  ],
};
