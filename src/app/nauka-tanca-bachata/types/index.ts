export interface Course {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  chapters: Chapter[];
  totalDuration: string;
  instructor: Instructor;
  rating: number;
  studentsCount: number;
  thumbnail: string;
  price?: number;
  isPopular?: boolean;
  tags: string[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
  isCompleted?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videos: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    perspective: "front" | "back" | "side" | "detail";
    instructor: string;
  }[];
  duration: string;
  thumbnail: string;
  isCompleted?: boolean;
  resources?: Resource[];
  quiz?: Quiz;
  practiceExercises?: Exercise[];
  nextLessonId?: string;
  previousLessonId?: string;
  prerequisites?: string[];
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  specialization: string[];
  rating: number;
  totalStudents: number;
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video" | "audio";
  url: string;
}

export interface Quiz {
  id: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  videoUrl?: string;
}
