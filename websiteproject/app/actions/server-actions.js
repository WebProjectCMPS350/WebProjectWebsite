"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import studentRepo from "@/app/repos/Student";
import adminRepo from "@/app/repos/Administrator";
import instructorRepo from "@/app/repos/Instructor";
import courseRepo from "@/app/repos/Course";
import classRepo from "@/app/repos/Class";

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

export async function getTotalClassesAction() {
  const totalClasses = (await classRepo.getClasses()).length;
  return totalClasses;
}

export async function getAvgStudentsPerCourseAction() {
  const totalStudentsPerCourse = await studentRepo.getAvgStudentsPerCourse();
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

export async function getFailureRatePerCourseAction() {
  const failureRate = await courseRepo.getFailureRatePerCourse();
  return failureRate;
}

export async function getAvgClassSizePerCourseCategoryAction() {
  const avgClassSizePerCourseCategory =
    await courseRepo.getAvgClassSizePerCourseCategory();
  return avgClassSizePerCourseCategory;
}

export async function getAvgClassSizePerCourseAction() {
  const avgClassSizePerCourse = await courseRepo.getAvgClassSizePerCourse();
  return avgClassSizePerCourse;
}

export async function getInstructorsLoadAction() {
  const instructorLoad = await instructorRepo.getInstructorsLoad();
  return instructorLoad;
}

export async function getPassRatePerCourseAction() {
  const passRate = await courseRepo.getPassRatePerCourse();
  return passRate;
}

export async function getPendingClassesAction() {
  const pendingClasses = await classRepo.getPendingClasses();
  return pendingClasses;
}

export async function getOpenClassesAction() {
  const openClasses = await classRepo.getOpenClasses();
  return openClasses;
}

export async function getCurrentClassesAction() {
  const currentClasses = await classRepo.getCurrentClasses();
  return currentClasses;
}

export async function getClosedClassesAction() {
  const closedClasses = await classRepo.getClosedClasses();
  return closedClasses;
}
