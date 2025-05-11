"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  getTotalStudentsAction,
  getTotalCoursesAction,
  getTotalInstructorsAction,
  getTotalStudentsPerCourseAction,
  getStudentsAverageGradeAction,
  getStudentsAverageGPAAction,
  getTop3CoursesAction,
} from "../actions/server-actions";

export default function Statistics() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [studentsPerCourse, setStudentsPerCourse] = useState(0);
  const [averageGrade, setAverageGrade] = useState(0);
  const [averageGPA, setAverageGPA] = useState(0);
  const [Top3Courses, setTop3Courses] = useState([]);

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

  async function getStudentsPerCourse() {
    const t = await getTotalStudentsPerCourseAction();
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

  useEffect(() => {
    getTotalStudents();
    getTotalCourses();
    getTotalInstructors();
    getStudentsPerCourse();
    getAverageGrade();
    getAverageGPA();
    getTop3Courses();
  }, []);

  return (
    <div className="container">
      <header>
        <a className="changable-link" href="#">
          <h1>QU Student Management</h1>
        </a>

        <nav>
          <ul>
            <li>
              <a href="about-us.html">About us</a>
            </li>
            <li>
              <a href="contact-us.html">Contact us</a>
            </li>
            <li>
              <a className="changable-link" href="#">
                Main page
              </a>
            </li>
            <li>
              <a href="login-page.html" id="logout">
                Logout
              </a>
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
                <a href="#">Total Students: </a>
                {totalStudents ? (
                  <span>{totalStudents}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {totalStudents > 1 ? "Students" : "Student"}
              </li>
              <li className="card">
                <a href="#">Total Courses: </a>
                {totalCourses ? (
                  <span>{totalCourses}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {totalCourses > 1 ? "Courses" : "Course"}
              </li>
              <li className="card">
                <a href="#">Total Instructor: </a>
                {totalInstructors ? (
                  <span>{totalInstructors}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {totalInstructors > 1 ? "Instructors" : "Instructor"}
              </li>
              <li className="card">
                <a href="#">The total of students per course: </a>
                {studentsPerCourse ? (
                  <span>{studentsPerCourse}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                {studentsPerCourse > 1 ? "Students" : "Student"}
              </li>
              <li className="card">
                <a href="#">Average grade: </a>
                {averageGrade ? (
                  <span>{averageGrade}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
              </li>
              <li className="card">
                <a href="#">Average GPA: </a>
                {averageGPA ? (
                  <span>{averageGPA}</span>
                ) : (
                  <span> Loading...</span>
                )}{" "}
                Out of 4.0
              </li>
              <li className="card">
                <a href="#">The top 3 courses taken by the students: </a>
                <ol className="sub-list">
                  {Top3Courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ol>
              </li>
              <li className="card">
                <a href="#">The failure rate per course</a>
              </li>
              <li className="card">
                <a href="#">Most popular course</a>
              </li>
              <li className="card">
                <a href="#">Average Class Size per Course Category</a>
              </li>
              <li className="card">
                <a href="#">Average Class Size per Course</a>
              </li>
              <li className="card">
                <a href="#">
                  Instructor Load (Number of Classes per Instructor):{" "}
                </a>
              </li>
              <li className="card">
                <a href="#">Student Enrollment Trends</a>
              </li>
              <li className="card">
                <a href="#">Most Active Days for Classes: </a>
              </li>
              <li className="card">
                <a href="#">Pass Rate per Class / Course: </a>
              </li>
              <li className="card">
                <a href="#">Average Number of Classes per Student: </a>
              </li>
              <li className="card">
                <a href="#">Class Availability Rate: </a>
              </li>
              <li className="card">
                <a href="#">Grade Distribution per Course: </a>
              </li>
              <li className="card">
                <a href="#">Courses with Most Prerequisites: </a>
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
