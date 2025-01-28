export interface Course {
  id: string;
  title: string;
  description: string;
  level:
    | "beginner"
    | "intermediate"
    | "advanced"
    | "isolations"
    | "lady-styling";
  chapters: Chapter[];
  totalDuration: string;
  instructor: Instructor | Instructor[];
  rating: number;
  studentsCount: number;
  thumbnail: string;
  tags: string[];
  progress?: {
    completedLessons: number;
    totalLessons: number;
    lastLessonId?: string;
  };
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  duration: string;
  isCompleted?: boolean;
  order: number;
}

export interface TextSection {
  title: string;
  content: string;
  images?: {
    url: string;
    caption: string;
    alt: string;
  }[];
}

export interface TextContent {
  sections?: TextSection[];
  component?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  type: "video" | "text";
  content: {
    videos?: {
      id: string;
      title: string;
      description: string;
      videoUrl: string;
      projectNameOfficial: string;
      instructor: string;
    }[];
    textContent?: TextContent;
  };
  isCompleted: boolean;
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

export interface LessonVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  projectNameOfficial: string;
  instructor: string;
}

export interface InstructorVideo {
  id: string;
  instructor: string;
  videoUrl: string;
  projectNameOfficial: string;
  title: string;
  description: string;
}

// Adapter do konwersji LessonVideo na InstructorVideo
export const adaptLessonVideoToInstructorVideo = (
  video: LessonVideo
): InstructorVideo => ({
  id: video.id,
  instructor: video.instructor,
  videoUrl: video.videoUrl,
  projectNameOfficial: video.projectNameOfficial,
  title: video.title,
  description: video.description,
});
