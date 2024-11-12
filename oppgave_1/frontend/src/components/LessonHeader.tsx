import type { Course, Lesson } from "../types/types";

type LessonHeaderProps = {
  course: Course | null;
  lesson: Lesson | null;
};

export default function LessonHeader({ course, lesson }: LessonHeaderProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h3 data-testid="course_title" className="mb-6 text-base font-bold">
          <a className="underline" href={`/kurs/${course?.slug}`}>
            {course?.title}
          </a>
        </h3>
        <span data-testid="course_category">
          Kategori: <span className="font-bold">{course?.category}</span>
        </span>
      </div>
      <h2 className="text-2xl font-bold" data-testid="lesson_title">
        {lesson?.title}
      </h2>
      <p data-testid="lesson_preAmble" className="mt-4 font-semibold leading-relaxed">
        {lesson?.preAmble}
      </p>
    </div>
  );
}

//ChatGPT