import { Course } from "../../types";
import { instructors } from "../instructors";

export const beginnerCourse: Course = {
  id: "bachata-podstawy",
  title: "Bachata od Podstaw",
  description:
    "Kompletny kurs dla początkujących. Poznaj podstawy bachaty, naucz się kroków, rytmu i pierwszych figur w prosty i przyjemny sposób.",
  level: "beginner",
  totalDuration: "8 godz",
  instructor: instructors.janKowalski,
  chapters: [
    {
      id: "rozdzial-1-rytm-i-kroki",
      title: "Rytm i podstawowe kroki",
      description: "Poznaj rytm bachaty i naucz się podstawowych kroków",
      order: 1,
      duration: "2 godz",
      lessons: [
        {
          id: "lekcja-1-1-rytm",
          title: "Rytm w bachacie",
          description:
            "Poznaj charakterystyczny rytm bachaty i naucz się go słyszeć w muzyce",
          duration: "30min",
          thumbnail: "/images/lessons/rhythm.jpg",
          videos: [
            {
              id: "v1-rytm",
              title: "Wprowadzenie do rytmu",
              description: "Podstawy rytmu bachaty i liczenie",
              videoUrl: "https://www.youtube.com/watch?v=ZSSXSi1rO24",
              perspective: "front",
              instructor: "Jan Kowalski",
            },
            {
              id: "v1-rytm-instagram",
              title: "Rytm bachaty - demonstracja",
              description: "Praktyczna demonstracja rytmu w bachacie",
              videoUrl: "https://www.youtube.com/watch?v=ZSSXSi1rO24",
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-1-2-krok-podstawowy",
          title: "Krok podstawowy",
          description: "Nauka kroku podstawowego w miejscu i z prowadzeniem",
          duration: "45min",
          thumbnail: "/images/lessons/basic-step.jpg",
          videos: [
            {
              id: "v2-krok",
              title: "Krok podstawowy - widok z przodu",
              description: "Szczegółowe objaśnienie kroku podstawowego",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
              perspective: "front",
              instructor: "Jan Kowalski",
            },
            {
              id: "v3-krok",
              title: "Krok podstawowy - widok z tyłu",
              description: "Analiza kroku z perspektywy tylnej",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
              perspective: "back",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-2-prowadzenie",
      title: "Podstawy prowadzenia",
      description: "Nauka podstaw prowadzenia w parze",
      order: 2,
      duration: "3 godz",
      lessons: [
        {
          id: "lekcja-2-1-ramka",
          title: "Prawidłowa ramka",
          description: "Jak trzymać ręce i utrzymać prawidłową postawę w parze",
          duration: "45min",
          thumbnail: "/images/lessons/frame.jpg",
          videos: [
            {
              id: "v4-ramka",
              title: "Ustawienie ramki",
              description: "Prawidłowe trzymanie i postawa w parze",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-2-2-prowadzenie",
          title: "Podstawy prowadzenia",
          description: "Nauka podstawowych zasad prowadzenia w parze",
          duration: "45min",
          thumbnail: "/images/lessons/leading.jpg",
          videos: [
            {
              id: "v5-prowadzenie",
              title: "Zasady prowadzenia",
              description: "Podstawowe techniki prowadzenia w parze",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
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
      id: "rozdzial-3-figury",
      title: "Pierwsze figury",
      description: "Nauka podstawowych figur tanecznych",
      order: 3,
      duration: "3 godz",
      lessons: [
        {
          id: "lekcja-3-1-obroty",
          title: "Podstawowe obroty",
          description: "Nauka obrotów w prawo i w lewo",
          duration: "45min",
          thumbnail: "/images/lessons/turns.jpg",
          videos: [
            {
              id: "v6-obroty",
              title: "Obroty podstawowe",
              description: "Technika wykonywania obrotów",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              perspective: "front",
              instructor: "Jan Kowalski",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-3-2-kombinacje",
          title: "Pierwsze kombinacje",
          description: "Łączenie kroków w proste kombinacje",
          duration: "45min",
          thumbnail: "/images/lessons/combinations.jpg",
          videos: [
            {
              id: "v7-kombinacje",
              title: "Podstawowe kombinacje",
              description: "Nauka łączenia figur w kombinacje",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
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
  thumbnail: "/images/courses/bachata-basics.webp",
  tags: ["bachata", "początkujący", "podstawy", "prowadzenie", "figury"],
};
