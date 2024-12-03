import { useEffect, useState } from "react";
import useCourse from "../hooks/useCourse";
import type { Comment, Lesson, Course } from "../types/types";
import { useParams } from "react-router-dom";

export default function Lesson() {
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    
    const [lessonComments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [course, setCourse] = useState<Course | null>(null);

    const { courseSlug, lessonSlug } = useParams<{
      courseSlug: string | undefined;
      lessonSlug: string | undefined;
    }>();
  
    const { getLesson, getComments, createComment, getCourse } = useCourse();

    const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
    };
  
    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
        if (!courseSlug || !lessonSlug) {
          console.error("Missing courseSlug or lessonSlug");
          return;
        }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormError(false);
      setSuccess(false);
      const leksjonId = await fetchLeksjonId(courseSlug, lessonSlug);

      if (!comment || !name) {
        setFormError(true);
      } else {
        const createdBy = name;

        await createComment({
          leksjonId,
          createdBy,
          comment
        });
        const commentsData = await getComments(courseSlug, lessonSlug);
        setComments(commentsData);
        setSuccess(true);
      }
    };
  
    useEffect(() => {
      const getContent = async () => {
        const lessonData = await getLesson(courseSlug, lessonSlug);
        const courseData = await getCourse(courseSlug) as Course;
        const commentsData = await getComments(courseSlug, lessonSlug);
        setLesson(lessonData);
        setCourse(courseData);
        setComments(commentsData);
      };
      getContent();
    }, [courseSlug, lessonSlug]);
  
    const fetchLeksjonId = async (courseSlug: string, lessonSlug: string): Promise<number> => {
      const response = await fetch(`/kurs/${courseSlug}/${lessonSlug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch lesson: ${response.statusText}`);
      }
      const lesson = await response.json();
      return lesson.id;
    };

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
        <p
          data-testid="lesson_preAmble"
          className="mt-4 font-semibold leading-relaxed"
        >
          {lesson?.preAmble}
        </p>
        {lesson?.text && lesson.text.length > 0 &&
          lesson.text.map((text) => (
            <p
              data-testid="lesson_text"
              className="mt-4 font-normal"
              key={text.id}
            >
              {text.text}
            </p>
          ))}
        <section data-testid="comments">
          <h4 className="mt-8 mb-4 text-lg font-bold">
            Kommentarer ({lessonComments?.length})
          </h4>
          <form data-testid="comment_form" onSubmit={handleSubmit} noValidate>
            <label className="mb-4 flex flex-col" htmlFor="name">
              <span className="mb-1 text-sm font-semibold">Navn*</span>
              <input
                data-testid="form_name"
                name="name"
                id="name"
                value={name}
                onChange={handleName}
                className="w-full rounded bg-slate-100"
              />
            </label>
            <label className="mb-4 flex flex-col" htmlFor="comment">
              <span className="mb-1 text-sm font-semibold">
                Legg til kommentar*
              </span>
              <textarea
                data-testid="form_textarea"
                name="comment"
                id="comment"
                value={comment}
                onChange={handleComment}
                className="w-full rounded bg-slate-100"
                cols={30}
              />
            </label>
            <button
              className="rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
              data-testid="form_submit"
              type="submit"
            >
              Legg til kommentar
            </button>
            {formError ? (
              <p className="font-semibold text-red-500" data-testid="form_error">
                Fyll ut alle felter med *
              </p>
            ) : null}
            {success ? (
              <p
                className="font-semibold text-emerald-500"
                data-testid="form_success"
              >
                Skjema sendt
              </p>
            ) : null}
          </form>
          <ul className="mt-8" data-testid="comments_list">
            {lessonComments?.length > 0
              ? lessonComments.map((c) => (
                  <li
                    className="mb-6 rounded border border-slate-200 px-4 py-6"
                    key={c.id}
                  >
                    <h5 data-testid="user_comment_name" className="font-bold">
                      {c.createdBy}
                    </h5>
                    <p data-testid="user_comment">{c.comment}</p>
                  </li>
                ))
              : null}
          </ul>
        </section>
      </div>
    );
  }