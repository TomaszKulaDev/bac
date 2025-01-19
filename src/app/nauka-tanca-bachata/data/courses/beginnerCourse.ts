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
    // ... reszta kodu z poprzedniego pliku dla kursu podstawowego ...
  ],
  rating: 4.8,
  studentsCount: 350,
  thumbnail: "/images/courses/first-dance.jpg",
  tags: ["pierwszy taniec", "bachata", "początkujący", "podstawy"],
  isPopular: true,
};
