import { Lesson } from "../types";

// Tymczasowe mock dane - docelowo będzie to pobierane z API
const mockLesson: Lesson = {
  id: "1",
  title: "Podstawowe kroki bachaty",
  description:
    "W tej lekcji nauczysz się podstawowych kroków bachaty, które są fundamentem tego tańca.",
  videos: [
    {
      id: "1",
      title: "Podstawowy krok - widok z przodu",
      description:
        "Zobacz dokładnie jak wykonać podstawowy krok z perspektywy frontalnej",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      perspective: "front",
      instructor: "Anna Kowalska",
    },
    {
      id: "2",
      title: "Podstawowy krok - widok z tyłu",
      description: "Zobacz ruch nóg i bioder z perspektywy tylnej",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      perspective: "back",
      instructor: "Jan Nowak",
    },
    {
      id: "3",
      title: "Technika bioder - szczegóły",
      description: "Szczegółowe wyjaśnienie techniki ruchu bioder",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      perspective: "detail",
      instructor: "Maria Wiśniewska",
    },
  ],
  duration: "15:00",
  thumbnail: "/images/lessons/basic-steps.jpg",
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
