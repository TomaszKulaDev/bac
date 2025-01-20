import { Course } from "../../types";
import { instructors } from "../instructors";

export const sensualCourse: Course = {
  id: "bachata-sensual-advanced",
  title: "Bachata Sensual - Styl i Elegancja",
  description:
    "Odkryj zmysłową stronę bachaty. Kurs dla osób znających podstawy, chcących rozwinąć styl sensual.",
  level: "intermediate",
  totalDuration: "10h",
  instructor: instructors.annaWisniewska,
  chapters: [
    {
      id: "rozdzial-1-sensual",
      title: "Podstawy stylu sensual",
      description: "Wprowadzenie do bachaty sensual i podstawowe ruchy",
      order: 1,
      duration: "3h",
      lessons: [
        {
          id: "lekcja-1-1-sensual",
          title: "Wprowadzenie do stylu sensual",
          description:
            "Czym jest bachata sensual i jak się różni od innych stylów",
          duration: "45min",
          thumbnail: "/images/lessons/sensual-intro.jpg",
          videos: [
            {
              id: "v1-sensual",
              title: "Charakterystyka stylu sensual",
              description: "Poznaj główne cechy bachaty sensual",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              perspective: "front",
              instructor: "Anna Wiśniewska",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-1-2-sensual",
          title: "Body movement - podstawy",
          description: "Podstawowe ruchy ciała w bachacie sensual",
          duration: "60min",
          thumbnail: "/images/lessons/body-movement.jpg",
          videos: [
            {
              id: "v2-sensual",
              title: "Izolacje i fale ciała",
              description: "Nauka podstawowych izolacji i fal",
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
      id: "rozdzial-2-sensual",
      title: "Figury sensual",
      description: "Charakterystyczne figury dla stylu sensual",
      order: 2,
      duration: "4h",
      lessons: [
        {
          id: "lekcja-2-1-sensual",
          title: "Cambre i roll",
          description: "Nauka podstawowych figur sensual",
          duration: "60min",
          thumbnail: "/images/lessons/cambre.jpg",
          videos: [
            {
              id: "v3-sensual",
              title: "Technika cambre",
              description: "Szczegółowa nauka figury cambre",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
              perspective: "side",
              instructor: "Anna Wiśniewska",
            },
          ],
          isCompleted: false,
        },
        {
          id: "lekcja-2-2-sensual",
          title: "Prowadzenie w sensual",
          description:
            "Techniki prowadzenia charakterystyczne dla stylu sensual",
          duration: "90min",
          thumbnail: "/images/lessons/sensual-leading.jpg",
          videos: [
            {
              id: "v4-sensual",
              title: "Prowadzenie w sensual",
              description: "Podstawy prowadzenia w stylu sensual",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
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
      id: "rozdzial-3-sensual",
      title: "Interpretacja muzyki",
      description: "Wyrażanie emocji i interpretacja muzyczna",
      order: 3,
      duration: "3h",
      lessons: [
        {
          id: "lekcja-3-1-sensual",
          title: "Emocje w tańcu",
          description: "Jak wyrażać emocje poprzez taniec",
          duration: "45min",
          thumbnail: "/images/lessons/emotions.jpg",
          videos: [
            {
              id: "v5-sensual",
              title: "Wyrażanie emocji",
              description: "Techniki wyrażania emocji w tańcu",
              videoUrl:
                "https://storage.googleapis.com/gtv-videos-bucket/sample/Escape.mp4",
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
  rating: 4.9,
  studentsCount: 180,
  thumbnail: "/images/courses/sensual-advanced.jpg",
  tags: ["bachata", "sensual", "średniozaawansowany", "body movement"],
  isPopular: true,
};
