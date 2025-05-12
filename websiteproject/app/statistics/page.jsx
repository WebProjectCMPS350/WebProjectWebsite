"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import {
  getTotalStudentsAction,
  getTotalCoursesAction,
  getTotalInstructorsAction,
  getTotalClassesAction,
  getAvgStudentsPerCourseAction,
  getStudentsAverageGradeAction,
  getStudentsAverageGPAAction,
  getTop3CoursesAction,
  getFailureRatePerCourseAction,
  getAvgClassSizePerCourseCategoryAction,
  getAvgClassSizePerCourseAction,
  getInstructorsLoadAction,
  getPassRatePerCourseAction,
  getPendingClassesAction,
  getOpenClassesAction,
  getCurrentClassesAction,
  getClosedClassesAction,
} from "../actions/server-actions";

export default function Statistics() {
  const [authorized, setAuthorized] = useState(null);
  const [userName, setUserName] = useState("");

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [studentsPerCourse, setStudentsPerCourse] = useState(0);
  const [averageGrade, setAverageGrade] = useState(0);
  const [averageGPA, setAverageGPA] = useState(0);
  const [Top3Courses, setTop3Courses] = useState([]);
  const [failureRatePerCourse, setFailureRatePerCourse] = useState([]);
  const [avgClassSizePerCourseCategory, setAvgClassSizePerCourseCategory] = useState([]);
  const [avgClassSizePerCourse, setAvgClassSizePerCourse] = useState([]);
  const [instructorsLoad, setInstructorsLoad] = useState([]);
  const [passRatePerCourse, setPassRatePerCourse] = useState([]);
  const [pendingClasses, setPendingClasses] = useState(null);
  const [openClasses, setOpenClasses] = useState(null);
  const [currentClasses, setCurrentClasses] = useState(null);
  const [closedClasses, setClosedClasses] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      // First try JWT cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("id_token="))
        ?.split("=")[1];

      if (token) {
        try {
          const res = await fetch("/api/auth-check", {
            method: "POST",
            body: JSON.stringify({ token }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) throw new Error("Invalid JWT");
          const { user } = await res.json();
          setUserName(user.name);
          setAuthorized(true);
          loadStatistics();
          return;
        } catch {
          // fallback to next check
        }
      }

      // Try GitHub login session (NextAuth)
      const session = await getSession();
      if (session) {
        setUserName(session.user.name);
        setAuthorized(true);
        loadStatistics();
      } else {
        // Neither method succeeded
        setAuthorized(false);
        window.location.href = "/auth/login";
      }
    }

    checkAuth();
  }, []);

  async function loadStatistics() {
    await Promise.all([
      getTotalStudents(),
      getTotalCourses(),
      getTotalInstructors(),
      getTotalClasses(),
      getStudentsPerCourse(),
      getAverageGrade(),
      getAverageGPA(),
      getPendingClasses(),
      getOpenClasses(),
      getCurrentClasses(),
      getClosedClasses(),
    ]);
  }

  async function getTotalStudents() {
    const t = await getTotalStudentsAction();
    setTotalStudents(t);
  }
  async function getTotalCourses() {
    const t = await getTotalCoursesAction();
    setTotalCourses(t);
  }
  async function getTotalInstructors() {
    const t = await getTotalInstructorsAction();
    setTotalInstructors(t);
  }
  async function getTotalClasses() {
    const t = await getTotalClassesAction();
    setTotalClasses(t);
  }
  async function getStudentsPerCourse() {
    const t = await getAvgStudentsPerCourseAction();
    setStudentsPerCourse(t);
  }
  async function getAverageGrade() {
    const t = await getStudentsAverageGradeAction();
    setAverageGrade(t);
  }
  async function getAverageGPA() {
    const t = await getStudentsAverageGPAAction();
    setAverageGPA(t);
  }
  async function getTop3Courses() {
    const top3Courses = await getTop3CoursesAction();
    setTop3Courses(top3Courses);
  }
  async function getFailureRatePerCourse() {
    const failureRate = await getFailureRatePerCourseAction();
    setFailureRatePerCourse(failureRate);
  }
  async function getAvgClassSizePerCourseCategory() {
    const avgClassSize = await getAvgClassSizePerCourseCategoryAction();
    setAvgClassSizePerCourseCategory(avgClassSize);
  }
  async function getAvgClassSizePerCourse() {
    const courses = await getAvgClassSizePerCourseAction();
    setAvgClassSizePerCourse(courses);
  }
  async function getInstructorsLoad() {
    const instructorsLoad = await getInstructorsLoadAction();
    setInstructorsLoad(instructorsLoad);
  }
  async function getPassRatePerCourse() {
    const passRate = await getPassRatePerCourseAction();
    setPassRatePerCourse(passRate);
  }
  async function getPendingClasses() {
    const pending = await getPendingClassesAction();
    setPendingClasses(pending);
  }
  async function getOpenClasses() {
    const open = await getOpenClassesAction();
    setOpenClasses(open);
  }
  async function getCurrentClasses() {
    const current = await getCurrentClassesAction();
    setCurrentClasses(current);
  }
  async function getClosedClasses() {
    const closed = await getClosedClassesAction();
    setClosedClasses(closed);
  }

  if (authorized === null) return <p>Loading...</p>;
  if (authorized === false) return null; // already redirected

  return (
    <div className="container">
      <header>
        <h2>Welcome, {userName}!</h2>
        {/* ... your existing nav or header ... */}
      </header>
      <main>
        {/* ... your statistics UI ... */}
      </main>
      <footer>
        {/* ... your footer ... */}
      </footer>
    </div>
  );
}
