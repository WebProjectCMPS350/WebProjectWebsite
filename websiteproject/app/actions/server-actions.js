"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import studentRepo from "@/app/repos/Student";
import adminRepo from "@/app/repos/Administrator";
import instructorRepo from "@/app/repos/Instructor";
import courseRepo from "@/app/repos/Course";

export async function getTotalStudentsAction() {
  const totalStudents = await studentRepo.getTotalStudents();
  return totalStudents;
}

export async function getTotalCoursesAction() {
  const totalCourses = await courseRepo.getTotalCourses();
  return totalCourses;
}

export async function getTotalInstructorsAction() {
  const totalInstructors = await instructorRepo.getTotalInstructors();
  return totalInstructors;
}

export async function getTotalStudentsPerCourseAction() {
  const totalStudentsPerCourse = await studentRepo.getTotalStudentsPerCourse();
  return totalStudentsPerCourse;
}

export async function getStudentsAverageGradeAction() {
  const studentsAverageGrade = await studentRepo.getStudentsAverageGrade();
  return studentsAverageGrade;
}

export async function getStudentsAverageGPAAction() {
  const studentsAverageGrade = await studentRepo.getStudentsAverageGPA();
  return studentsAverageGrade;
}

export async function getTop3CoursesAction() {
  const top3Courses = await courseRepo.getTop3Courses();
  return top3Courses;
}
