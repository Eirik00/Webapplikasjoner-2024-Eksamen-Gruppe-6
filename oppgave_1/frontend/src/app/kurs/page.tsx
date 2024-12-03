"use client";

import Courses from "../../components/Courses";
import All from "../../pages/All";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "../../components/Course";
import Lesson from "../../components/Lesson";

export default function Pages() {
  return (
    <main className="h-full">
      <Router>
        <All>
          <Routes>
            <Route path="/kurs" element={<Courses />} />
            <Route path="/kurs/:courseSlug" element={<Course />} />
            <Route path="/kurs/:courseSlug/:lessonSlug" element={<Lesson />} />
          </Routes>
        </All>
      </Router>
    </main>
  );
  }
