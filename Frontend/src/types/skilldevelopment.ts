export interface SyllabusItem {
  title: string;
  description: string[]; // Array of paragraphs
  imageUrl?: string; // Optional image URL
}

export interface Course {
  title: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  imageUrl: string;
  details: {
    overview: string;
    syllabus: SyllabusItem[]; // Updated to use SyllabusItem
    instructor: {
      name: string;
      bio: string;
      imageUrl: string;
    };
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  courses: Course[];
}
