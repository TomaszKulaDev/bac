import { Course, TimeMarker, LessonVideoContent } from "../../types";
import { instructors, INSTRUCTOR_KEYS, INSTRUCTOR_NAMES } from "../instructors";

const timeMarkers: TimeMarker[] = [
  {
    id: "intro",
    time: 0,
    title: "Wprowadzenie",
    description: "Omówienie podstaw izolacji ramion",
  },
  {
    id: "basic-movement",
    time: 45,
    title: "Podstawowy ruch",
    description: "Technika podstawowego ruchu ramion",
  },
  {
    id: "advanced-technique",
    time: 120,
    title: "Zaawansowana technika",
    description: "Złożone ruchy izolowane",
  },
  // Dodaj więcej znaczników według potrzeb
];

const lessonVideo: LessonVideoContent = {
  id: "v1-podstawy-ramion",
  title: "Podstawy izolacji ramion",
  description: "Wprowadzenie do technik izolacji ramion",
  videoUrl: "https://www.youtube.com/watch?v=JMHD8nGwFlc",
  instructor: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.SO_KAYKA],
  projectNameOfficial: "Katarzyna Sadowska",
  timeMarkers: timeMarkers,
};

export const armsIsolationCourse: Course = {
  id: "bachataa-izolacjeee-ramion",
  title: "Zaawansowane izolacje ramion",
  description:
    "Zaawansowany kurs techniki izolacji ramion. Naucz się płynnie poruszać ramionami.",
  level: "isolations",
  totalDuration: "18 min",
  instructor: [instructors[INSTRUCTOR_KEYS.SO_KAYKA]],

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
            videos: [lessonVideo],
          },
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
  ],
  rating: 4.9,
  studentsCount: 280,
  thumbnail: "/images/courses/izolacje-ramion.jpg",
  tags: ["bachata", "izolacje", "ramiona", "technika", "styling"],
};
