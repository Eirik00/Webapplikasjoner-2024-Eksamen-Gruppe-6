import { courses, comments } from '../data/data'; // Importerer data fra data.ts
import { Course, Lesson, Comment } from '../types/types'; // Importerer Course, Lesson og Comment fra types.ts

const useCourse = () => {
  const createCourse = async (data: Course) => {
    courses.push(data);
  };

  const getCourse = async (slug: string) => {
    const data = courses.filter((course) => course.slug === slug);
    return data?.[0];
  };

  const getLesson = async (courseSlug: string, lessonSlug: string) => {
    const data = courses
      .flatMap((course) => 
        course.slug === courseSlug ? course.lessons.filter((lesson) => lesson.slug === lessonSlug) : []
      ) as Lesson[];
    return data?.[0];
  };

  const getComments = async (lessonSlug: string) => {
    const data = comments.filter(
      (comment) => comment.lesson.slug === lessonSlug
    );
    return data;
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