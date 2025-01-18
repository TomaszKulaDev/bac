import { Lesson } from "../types";

// Tymczasowe mock dane - docelowo będzie to pobierane z API
const mockLesson: Lesson = {
  id: "1",
  title: "Podstawowe kroki bachaty",
  description:
    "W tej lekcji nauczysz się podstawowych kroków bachaty, które są fundamentem tego tańca.",
  videoUrl:
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  duration: "15 min",
  thumbnail: "/images/lesson-1-thumb.jpg",
  practiceExercises: [
    {
      id: "1",
      title: "Ćwiczenie podstawowego kroku",
      description: "Przećwicz podstawowy krok w miejscu",
      duration: "5 min",
      difficulty: "easy",
    },
  ],
  resources: [
    {
      id: "1",
      title: "Ściąga z kroków podstawowych",
      type: "pdf",
      url: "/resources/basic-steps.pdf",
    },
  ],
};

export async function getLessonById(id: string): Promise<Lesson | null> {
  // TODO: Zaimplementuj pobieranie z API
  return mockLesson;
}
