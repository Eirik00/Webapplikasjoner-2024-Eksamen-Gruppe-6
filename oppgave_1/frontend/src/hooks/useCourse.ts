import { courses, comments } from '../data/data'; // Importerer data fra data.ts
import { Course, Lesson, Comment } from '../types/types'; // Importerer Course, Lesson og Comment fra types.ts
const API_BASE = "http://localhost:3999";

const useCourse = () => {

  const createCourse = async (data: Course) => {
    const response = await fetch(`${API_BASE}/kurs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };


  const getCourse = async (slug: string) => {
    const response = await fetch(`${API_BASE}/kurs/${slug}`);
    return response.json();
  };
  const getLesson = async (courseSlug: string, lessonSlug: string) => {
    const data = courses
      .flatMap((course) => 
        course.slug === courseSlug ? course.lessons.filter((lesson) => lesson.slug === lessonSlug) : []
      ) as Lesson[];
    return data?.[0];
  };

  const getComments = async (courseSlug: string, lessonSlug: string) => {
    const response = await fetch(`${API_BASE}/kurs/${courseSlug}/${lessonSlug}/kommentarer`);
    return response.json();
  };

  const createComment = async (data: Comment) => {
    comments.push(data);
  };

  return {
    createCourse,
    getLesson,
    getComments,
    createComment,
    getCourse,
  };
};

export default useCourse;