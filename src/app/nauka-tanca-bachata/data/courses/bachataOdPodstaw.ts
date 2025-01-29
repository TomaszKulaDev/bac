import { Course } from "../../types";
import { instructors, INSTRUCTOR_KEYS, INSTRUCTOR_NAMES } from "../instructors";

export const beginnerCourse: Course = {
  id: "bachata-podstawy",
  title: "Bachata od Podstaw",
  description:
    "Kompletny kurs dla początkujących. Poznaj podstawy bachaty, naucz się kroków, rytmu i pierwszych figur w prosty i przyjemny sposób.",
  level: "beginner",
  totalDuration: "8 godz",
  instructor: [
    instructors[INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA],
    instructors[INSTRUCTOR_KEYS.DEMETRIO_NICOLE],
  ],

  chapters: [
    {
      id: "rozdzial-0-wprowadzenie",
      title: "Wprowadzenie do kursu",
      description:
        "Poznaj podstawowe informacje o kursie i bachacie jako tańcu",
      order: 0,
      duration: "30 min",
      lessons: [
        {
          id: "lekcja-0-1-autor",
          title: "Zanim zaczniesz",
          description:
            "Poznaj instruktorów, którzy poprowadzą Cię przez kurs bachaty",
          duration: "2 min",
          thumbnail: "/images/lessons/author.jpg",
          type: "text",
          content: {
            textContent: {
              component: "AuthorLesson",
            },
          },
          isCompleted: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: "rozdzial-1-krok-podstawowy",
      title: "Kroki podstawowe Solo",
      description: "Naucz się podstawowych kroków",
      order: 1,
      duration: "3 min",
      lessons: [
        {
          id: "lekcja-1-1-krok-podstawowy",
          title: "Krok podstawowy bez pary",
          description:
            "",
          duration: "30min",
          thumbnail: "/images/lessons/rhythm.jpg",
          type: "video",
          content: {
            videos: [
              {
                id: "v1-rytm",
                title: "Wprowadzenie do rytmu",
                description: "Podstawy rytmu bachaty i liczenie",
                videoUrl:
                  "https://res.cloudinary.com/dqeemjgmx/video/upload/v1738091142/bachataOdPodstaw/Bachata%20Beginner%20Basic%20Steps%20Tutorial.mp4",
                instructor: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.DEMETRIO_NICOLE],
                projectNameOfficial: "Bachata Dance Academy",
              },
              {
                id: "v1-rytm-instagram",
                title: "Rytm bachaty - demonstracja",
                description: "Praktyczna demonstracja rytmu w bachacie",
                videoUrl:
                  "https://res.cloudinary.com/dgifdcgul/video/upload/v1738144243/1.Bachata_Beginner_Basic_Steps_Tutorial_-_Luis_Andrea_xj9do4.mp4",
                projectNameOfficial: "Dance Surfing Academy",
                instructor: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.LUIS_ANDREA],
              },
              {
                id: "v2-rytm-instagram",
                title: "Rytm bachaty - demonstracja",
                description: "Praktyczna demonstracja rytmu w bachacie",
                videoUrl:
                  "https://res.cloudinary.com/dgifdcgul/video/upload/v1738144745/1.Bachata_Beginner_Basic_Steps_Tutorial_-_Gero_Vivian_nviv5b.mp4",
                projectNameOfficial: "LA Palace Studio",
                instructor: INSTRUCTOR_NAMES[INSTRUCTOR_KEYS.GERO_VIVIAN],
              },
            ],
          },

          isCompleted: false,
        },
        {
          id: "lekcja-1-2-krok-podstawowy",
          title: "Krok podstawowy",
          description: "Nauka kroku podstawowego w miejscu i z prowadzeniem",
          duration: "45min",
          thumbnail: "/images/lessons/basic-step.jpg",
          type: "video",
          content: {
            videos: [
              {
                id: "v2-krok",
                title: "Krok podstawowy - widok z przodu",
                description: "Szczegółowe objaśnienie kroku podstawowego",
                videoUrl:
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                projectNameOfficial: "LA Palace Studio",
                instructor: "Jan Kowalski",
              },
              {
                id: "v3-krok",
                title: "Krok podstawowy - widok z tyłu",
                description: "Analiza kroku z perspektywy tylnej",
                videoUrl:
                  "https://res.cloudinary.com/dqeemjgmx/video/upload/v1737590591/Rithika_a5nv59.mp4",
                projectNameOfficial: "LA Palace Studio",
                instructor: "Jan Kowalski",
              },
            ],
          },
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
          type: "video",
          content: {
            videos: [
              {
                id: "v4-ramka",
                title: "Ustawienie ramki",
                description: "Prawidłowe trzymanie i postawa w parze",
                videoUrl:
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                projectNameOfficial: "LA Palace Studio",
                instructor: "Jan Kowalski",
              },
            ],
          },
          isCompleted: false,
        },
        {
          id: "lekcja-2-2-prowadzenie",
          title: "Podstawy prowadzenia",
          description: "Nauka podstawowych zasad prowadzenia w parze",
          duration: "45min",
          thumbnail: "/images/lessons/leading.jpg",
          type: "video",
          content: {
            videos: [
              {
                id: "v5-prowadzenie",
                title: "Zasady prowadzenia",
                description: "Podstawowe techniki prowadzenia w parze",
                videoUrl:
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
                projectNameOfficial: "LA Palace Studio",
                instructor: "Jan Kowalski",
              },
            ],
          },
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
          type: "text",
          content: {
            textContent: {
              sections: [
                {
                  title: "Wprowadzenie do obrotów",
                  content: `
# Podstawy obrotów w bachacie

Obroty są jednym z podstawowych elementów bachaty. W tej lekcji nauczysz się:
- Prawidłowej postawy podczas obrotu
- Techniki obrotu w prawo
- Techniki obrotu w lewo
- Najczęstszych błędów i jak ich unikać

## Prawidłowa postawa

Podczas wykonywania obrotu należy pamiętać o:
1. Wyprostowanej sylwetce
2. Napiętym brzuchu
3. Utrzymaniu równowagi na śródstopiu
                  `,
                  images: [
                    {
                      url: "/images/lessons/turn-posture.jpg",
                      caption: "Prawidłowa postawa podczas obrotu",
                      alt: "Demonstracja prawidłowej postawy podczas wykonywania obrotu w bachacie",
                    },
                  ],
                },
                {
                  title: "Technika obrotu w prawo",
                  content: `
## Krok po kroku

1. Rozpocznij od pozycji podstawowej
2. Przenieś ciężar ciała na prawą nogę
3. Zainicjuj obrót przez skręt górnej części ciała
4. Wykonaj obrót na śródstopiu prawej nogi
5. Zakończ obrót wracając do pozycji wyjściowej
                  `,
                },
              ],
            },
          },
          isCompleted: false,
        },
        {
          id: "lekcja-3-2-kombinacje",
          title: "Pierwsze kombinacje",
          description:
            "W tej lekcji nauczysz się jak łączyć poznane wcześniej kroki podstawowe w płynne kombinacje taneczne.",
          duration: "45min",
          thumbnail: "/images/lessons/combinations.jpg",
          type: "video",
          content: {
            videos: [
              {
                id: "v7-kombinacje",
                title: "Podstawowe kombinacje",
                description: "Nauka łączenia figur w kombinacje",
                videoUrl: "",
                projectNameOfficial: "LA Palace Studio",
                instructor: "Jan Kowalski",
              },
            ],
          },
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
