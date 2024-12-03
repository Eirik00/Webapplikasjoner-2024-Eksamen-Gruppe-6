import { useEffect, useState } from "react";
//import { courses, categories } from "../data/data";
import useCourse from "../hooks/useCourse";
import { categories } from "@/data/data";
import { Link } from "react-router-dom";

type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
};

export default function Courses() {
    const [value, setValue] = useState("");  
    const [data, setData] = useState<Course[]>([]);
    const [courses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3999/kurs");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCourses();
    }, []);

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const category = event.target.value;
      setValue(category);
      if (category && category.length > 0) {
        const content = courses.filter((course) =>
          course.category.toLocaleLowerCase().includes(category.toLowerCase())
        );
        setData(content);
      } else {
        setData(courses);
      }
    };

    if (loading) return <p>Loading...</p>;

    return (
      <>
        <header className="mt-8 flex items-center justify-between">
          <h2 className="mb-6 text-xl font-bold" data-testid="title">
            Alle kurs
          </h2>
          <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
            <span className="sr-only mb-1 block">Velg kategori:</span>
            <select
              id="filter"
              name="filter"
              data-testid="filter"
              value={value}
              onChange={handleFilter}
              className="min-w-[200px] rounded bg-slate-200"
            >
              <option value="">Alle</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </header>
        <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
          {data && data.length > 0 ? (
            data.map((course) => (
              <article
                className="rounded-lg border border-slate-400 px-6 py-8"
                key={course.id}
                data-testid="course_wrapper"
              >
                <span className="block text-right capitalize">
                  [{course.category}]
                </span>
                <h3
                  className="mb-2 text-base font-bold"
                  data-testid="courses_title"
                >
                  <a href={`/kurs/${course.slug}`}>{course.title}</a>
                </h3>
                <p
                  className="mb-6 text-base font-light"
                  data-testid="courses_description"
                >
                  {course.description}
                </p>
                <Link
              className="font-semibold underline"
              data-testid="courses_url"
              to={`/kurs/${course.slug}`}
            >
              Til kurs
            </Link>
              </article>
            ))
          ) : (
            <p data-testid="empty">Ingen kurs</p>
          )}
        </section>
      </>
    );
  }
  