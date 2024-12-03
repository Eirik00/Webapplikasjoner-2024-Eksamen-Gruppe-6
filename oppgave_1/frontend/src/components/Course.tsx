"use client"

import { useState, useEffect } from "react";
import Lesson from "./Lesson";
import { courses, users } from "../data/data";
import type { Course } from "../types/types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

type CourseProps = {
  slug: string;
};

export default function Course() {
    const [content, setContent] = useState<Course | null>(null);
    
    const { courseSlug, lessonSlug } = useParams<{
      courseSlug: string;
      lessonSlug: string;
    }>();

    const getCourse = async (courseSlug: string) => {

    const courseResponse = await fetch(`http://localhost:3999/kurs/${courseSlug}`);
    const course = await courseResponse.json();
    
    const lessonsResponse = await fetch(`http://localhost:3999/kurs/${courseSlug}/leksjoner`);
    const lessons = await lessonsResponse.json();
    
    return { ...course, lessons };

    };
    
    if (!courseSlug) {
      return <p>Kurs ikke funnet</p>;
    }

    useEffect(() => {
      const getContent = async () => {
        const data = await getCourse(courseSlug);
        setContent(data);
      };
      getContent();
    }, [courseSlug]);
  
    return (
      <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
        <aside className="border-r border-slate-200 pr-6">
          <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
          <ul data-testid="lessons">
            {content?.lessons?.map((lesson) => (
              <li
                className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                  lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
                }`}
                key={lesson.id}
              >
                <Link
                  to={`/kurs/${content?.slug}/${lesson.slug}`}
                  className={`block h-full w-full`}
                  data-testid="lesson_url"
                  data-slug={lessonSlug}
                  >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        {lessonSlug ? (
          <article>
            <Lesson />
          </article>
        ) : (
          <section>
            <>
              <h2 className="text-2xl font-bold" data-testid="course_title">
                {content?.title}
              </h2>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description"
              >
                {content?.description}
              </p>
            </>
          </section>
        )}
        <aside
          data-testid="enrollments"
          className="border-l border-slate-200 pl-6"
        >
          <h3 className="mb-4 text-base font-bold">Deltakere</h3>
          <ul data-testid="course_enrollments">
            {users?.map((user) => (
              <li className="mb-1" key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }