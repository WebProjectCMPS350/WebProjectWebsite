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
  const [avgClassSizePerCourseCategory, setAvgClassSizePerCourseCategory] =
    useState([]);
  const [avgClassSizePerCourse, setAvgClassSizePerCourse] = useState([]);
  const [instructorsLoad, setInstructorsLoad] = useState([]);
  const [passRatePerCourse, setPassRatePerCourse] = useState([]);
  const [pendingClasses, setPendingClasses] = useState(null);
  const [openClasses, setOpenClasses] = useState(null);
  const [currentClasses, setCurrentClasses] = useState(null);
  const [closedClasses, setClosedClasses] = useState(null);

  useEffect(() => {
    async function checkAuth() {
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
        } catch {}
      }

      const session = await getSession();
      if (session) {
        setUserName(session.user.name);
        setAuthorized(true);
        loadStatistics();
      } else {
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
  if (authorized === false) return null;

  return (
    <div className="container">
      <header>
        <a className="changable-link" href="#">
          <h1>QU Student Management</h1>
        </a>

        <nav>
          <ul>
            <li>
              <Link href="about-us.html">About us</Link>
            </li>
            <li>
              <Link href="contact-us.html">Contact us</Link>
            </li>
            <li>
              <Link className="changable-link" href="admin-main-page.html">
                Main page
              </Link>
            </li>
            <li>
              <Link href="login-page.html" id="logout">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="statistics">
          <h2>📊 Statistics Dashboard</h2>
          <p>
            Welcome to the Statistics Dashboard of the QU Student Management
            System. This page provides key insights into student enrollments,
            course performance, instructor workloads, and overall academic
            trends across the platform. By analyzing this data, administrators
            and educators can make informed decisions to improve curriculum
            design, resource allocation, and student success outcomes.
          </p>
          <hr />

          <div className="statistics-content">
            <ol>
              <li className="card">
                <p>Total Students: </p>
                {totalStudents ? (
                  <span>{totalStudents}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {totalStudents > 1 ? "Students" : "Student"}
              </li>
              <li className="card">
                <p>Total Courses: </p>
                {totalCourses ? (
                  <span>{totalCourses}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {totalCourses > 1 ? "Courses" : "Course"}
              </li>
              <li className="card">
                <p>Total Classes: </p>
                {totalCourses ? (
                  <span>{totalClasses}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {totalClasses > 1 ? "Classes" : "Class"}
              </li>
              <li className="card">
                <p>Total Instructor: </p>
                {totalInstructors ? (
                  <span>{totalInstructors}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {totalInstructors > 1 ? "Instructors" : "Instructor"}
              </li>
              <li className="card">
                <p>The average number of students per course: </p>
                {studentsPerCourse ? (
                  <span>{studentsPerCourse}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {studentsPerCourse > 1 ? "Students" : "Student"}
              </li>
              <li className="card">
                <p>Average grade: </p>
                {averageGrade ? (
                  <span>{averageGrade}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
              </li>
              <li className="card">
                <p>Average GPA: </p>
                {averageGPA ? (
                  <span>{averageGPA}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                Out of 4.0
              </li>
              <li className="card" onClick={getTop3Courses}>
                <p>The top 3 courses taken by the students: </p>
                <ol className="sub-list">
                  {Top3Courses.map((course, index) => (
                    <li key={index}>
                      {course.courseName} : {course.noOfStudents}
                      {course.noOfStudents > 1 ? " Students" : " Student"}
                    </li>
                  ))}
                </ol>
              </li>
              <li className="card" onClick={getFailureRatePerCourse}>
                <p>The failure rate per course: </p>
                <ol className="sub-list">
                  {failureRatePerCourse.map((course, index) => (
                    <li key={index}>
                      {course.courseName} : {course.failureRate}%
                    </li>
                  ))}
                </ol>
              </li>

              <li className="card" onClick={getAvgClassSizePerCourseCategory}>
                <p>Average Class Size per Course Category: </p>
                <ol className="sub-list">
                  {avgClassSizePerCourseCategory.map((course, index) => (
                    <li key={index}>
                      {course.category} : {course.avgClassSize}
                      {course.avgClassSize > 1 ? " Students" : " Student"}
                    </li>
                  ))}
                </ol>
              </li>
              <li className="card" onClick={getAvgClassSizePerCourse}>
                <p>Average Class Size per Course: </p>
                <ol className="sub-list">
                  {avgClassSizePerCourse.map((course, index) => (
                    <li key={index}>
                      {course.courseName} : {course.avgClassSize}
                      {course.avgClassSize > 1 ? " Students" : " Student"}
                    </li>
                  ))}
                </ol>
              </li>
              <li className="card" onClick={getInstructorsLoad}>
                <p>Instructor Load (Number of Classes per Instructor): </p>
                <ol className="sub-list">
                  {instructorsLoad.map((instructor, index) => (
                    <li key={index}>
                      {instructor.name} : {instructor.totalClasses}{" "}
                      {instructor.totalClasses > 1 ? "Classes" : "Class"} with{" "}
                      {instructor.totalStudents}{" "}
                      {instructor.totalStudents > 1 ? "Students" : "Student"}
                    </li>
                  ))}
                </ol>
              </li>
              <li className="card" onClick={getPassRatePerCourse}>
                <p>Pass Rate per Course: </p>
                <ol className="sub-list">
                  {passRatePerCourse.map((course, index) => (
                    <li key={index}>
                      {course.courseName} : {course.passRate}%
                    </li>
                  ))}
                </ol>
              </li>
              <li className="card">
                <p>Number of Pending classes: </p>
                <span>{pendingClasses}</span>
                {pendingClasses > 1 ? " Classes" : " Class"}
              </li>
              <li className="card">
                <p>Number of Open Classes: </p>
                {openClasses ? (
                  <span>{openClasses}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {openClasses > 1 ? "Classes" : "Class"}
              </li>
              <li className="card">
                <p>Number of Current Classes: </p>
                {currentClasses ? (
                  <span>{currentClasses}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {currentClasses > 1 ? "Classes" : "Class"}
              </li>
              <li className="card">
                <p>Number of Closed Classes: </p>
                {closedClasses ? (
                  <span>{closedClasses}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {closedClasses > 1 ? "Classes" : "Class"}
              </li>
            </ol>
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-content">
          <p>&copy; 2025 QU Student Management. All rights reserved.</p>

          <ul className="socials">
            <li>
              <a href="#" title="Soon...">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Soon...">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Soon...">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Soon...">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Soon...">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
            <li>
              <a
                title="Check the website repo on GitHub"
                href="https://github.com/WebProjectCMPS350/WebProjectWebsite"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Soon...">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
