// types til bruk på flere steder.
export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    lessons: Lesson[];
    category: string;
  }
  
  export interface Lesson {
    id: string;
    title: string;
    slug: string;
    preAmble: string;
    text: { id: string; text: string }[];
  }
  
  export interface Comment {
    id?: string;
    leksjonId: number;
    createdBy: string;
    comment: string;
  }