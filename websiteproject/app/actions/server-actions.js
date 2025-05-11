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
