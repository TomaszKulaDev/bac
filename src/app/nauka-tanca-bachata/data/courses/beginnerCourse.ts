import { Course } from "../../types";
import { instructors } from "../instructors";
import { SAMPLE_VIDEOS } from "../sampleVideos";

export const beginnerCourse: Course = {
  id: "bachata-podstawy",
  title: "Bachata od podstaw - pierwszy taniec",
  description:
    "Idealny kurs dla par przygotowujących się do pierwszego tańca lub osób rozpoczynających przygodę z bachatą. Nauczysz się podstaw w 4 tygodnie!",
  level: "beginner",
  totalDuration: "6h 45min",
  instructor: instructors.janKowalski,
  chapters: [
    {
      id: "rozdzial-1-podstawy",
      title: "Pierwsze kroki",
      description: "Podstawowe kroki i rytmika w bachacie",
      order: 1,
      duration: "2h",
      lessons: [
        {
          id: "lekcja-1-1-podstawy",
          title: "Rytm i podstawowy krok",
          description: "Poznaj rytm bachaty i naucz się podstawowego kroku",
          duration: "45min",
          thumbnail: "/images/lessons/basic-step.jpg",
          videos: [
            {
              id: "v1-podstawy",
              title: "Podstawowy krok",
              description: "Szczegółowe objaśnienie podstawowego kroku",
              videoUrl: SAMPLE_VIDEOS.BUNNY,
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-1-2-podstawy",
          title: "Prowadzenie w parze",
          description: "Nauka podstawowego prowadzenia w parze",
          duration: "45min",
          thumbnail: "/images/lessons/leading.jpg",
          videos: [
            {
              id: "v2-podstawy",
              title: "Prowadzenie podstawowe",
              description: "Jak prowadzić partnerkę w podstawowym kroku",
              videoUrl: SAMPLE_VIDEOS.SINTEL,
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-2-podstawy",
      title: "Pierwsze figury",
      description: "Podstawowe figury taneczne",
      order: 2,
      duration: "2h 45min",
      lessons: [
        {
          id: "lekcja-2-1-podstawy",
          title: "Obroty podstawowe",
          description: "Nauka podstawowych obrotów w bachacie",
          duration: "60min",
          thumbnail: "/images/lessons/basic-turns.jpg",
          videos: [
            {
              id: "v3-podstawy",
              title: "Obroty damskie",
              description: "Technika obrotów dla partnerki",
              videoUrl: SAMPLE_VIDEOS.TEARS,
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-2-2-podstawy",
          title: "Podstawowe kombinacje",
          description: "Łączenie kroków w proste kombinacje",
          duration: "45min",
          thumbnail: "/images/lessons/basic-combinations.jpg",
          videos: [
            {
              id: "v4-podstawy",
              title: "Kombinacje podstawowe",
              description: "Pierwsze kombinacje figur",
              videoUrl: SAMPLE_VIDEOS.BLAZE,
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-3-podstawy",
      title: "Pierwszy taniec",
      description: "Przygotowanie pierwszego tańca",
      order: 3,
      duration: "2h",
      lessons: [
        {
          id: "lekcja-3-1-podstawy",
          title: "Choreografia weselna",
          description: "Nauka prostej choreografii na pierwszy taniec",
          duration: "60min",
          thumbnail: "/images/lessons/wedding-dance.jpg",
          videos: [
            {
              id: "v5-podstawy",
              title: "Choreografia część 1",
              description: "Pierwsza część choreografii weselnej",
              videoUrl: SAMPLE_VIDEOS.ESCAPE,
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-3-2-podstawy",
          title: "Wejście i ukłony",
          description: "Efektowne wejście i zakończenie pierwszego tańca",
          duration: "30min",
          thumbnail: "/images/lessons/wedding-entrance.jpg",
          videos: [
            {
              id: "v6-podstawy",
              title: "Wejście i ukłony",
              description: "Jak efektownie rozpocząć i zakończyć taniec",
              videoUrl: SAMPLE_VIDEOS.FUN,
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
  ],
  rating: 4.8,
  studentsCount: 350,
  thumbnail: "/images/courses/first-dance.jpg",
  tags: ["pierwszy taniec", "bachata", "początkujący", "podstawy"],
  isPopular: true,
};
