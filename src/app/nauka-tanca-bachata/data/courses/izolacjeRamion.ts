import { Course } from "../../types";
import { instructors, INSTRUCTOR_KEYS, INSTRUCTOR_NAMES } from "../instructors";

export const armsIsolationCourse: Course = {
  id: "bachataa-izolacjeee-ramion",
  title: "Izolacje Ramion w Bachacie",
  description:
    "Zaawansowany kurs techniki izolacji ramion. Naucz się płynnie poruszać ramionami, tworząc eleganckie i zmysłowe ruchy w bachacie.",
  level: "intermediate",
  totalDuration: "6 godz",
  instructor: [
    instructors[INSTRUCTOR_KEYS.GERO_VIVIAN],
    instructors[INSTRUCTOR_KEYS.LUIS_ANDREA],
  ],

  chapters: [
    {
      id: "rozdzial-1-podstawy-izolacji",
      title: "Podstawy izolacji ramion",
      description: "Naucz się podstawowych ruchów izolowanych ramion",
      order: 1,
      duration: "2 godz",
      lessons: [
        {
          id: "lekcja-1-1-podstawowe-ruchy",
          title: "Podstawowe ruchy ramion",
          description: "Techniki izolacji pojedynczego ramienia",
          duration: "45min",
          thumbnail: "/images/lessons/arms-isolation/basic-moves.jpg",
          type: "video",
          content: {
            videos: [
              {
                id: "v1-podstawy-ramion",
                title: "Podstawy izolacji ramion",
                description: "Wprowadzenie do technik izolacji ramion",
                videoUrl: "https://www.youtube.com/watch?v=JMHD8nGwFlc",
                instructor: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.GERO_VIVIAN],
                projectNameOfficial: "Bachata Arms Academy",
              },
            ],
          },
          isCompleted: false,
        },
        {
          id: "lekcja-1-2-koordynacja",
          title: "Koordynacja ruchów",
          description: "Łączenie ruchów obu ramion",
          duration: "45min",
          thumbnail: "/images/lessons/arms-isolation/coordination.jpg",
          type: "video",
          content: {
            videos: [
              {
                id: "v2-koordynacja",
                title: "Koordynacja ramion",
                description: "Ćwiczenia koordynacyjne dla obu ramion",
                videoUrl:
                  "https://res.cloudinary.com/dqeemjgmx/video/upload/v1738091142/izolacjeRamion/arms-coordination.mp4",
                instructor: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.LUIS_ANDREA],
                projectNameOfficial: "LA Dance Studio",
              },
            ],
          },
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-2-zaawansowane",
      title: "Zaawansowane techniki",
      description: "Złożone ruchy i kombinacje",
      order: 2,
      duration: "2 godz",
      lessons: [
        {
          id: "lekcja-2-1-fale",
          title: "Ruchy falowe ramion",
          description: "Technika płynnych ruchów falowych",
          duration: "60min",
          thumbnail: "/images/lessons/arms-isolation/waves.jpg",
          type: "video",
          content: {
            videos: [
              {
                id: "v3-fale",
                title: "Technika fal ramionami",
                description: "Zaawansowane ruchy falowe",
                videoUrl:
                  "https://res.cloudinary.com/dqeemjgmx/video/upload/v1738091142/izolacjeRamion/arms-waves.mp4",
                instructor: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.GERO_VIVIAN],
                projectNameOfficial: "Bachata Arms Academy",
              },
            ],
          },
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
  ],
  rating: 4.9,
  studentsCount: 280,
  thumbnail: "/images/courses/arms-isolation.webp",
  tags: ["bachata", "izolacje", "ramiona", "technika", "styling"],
};
