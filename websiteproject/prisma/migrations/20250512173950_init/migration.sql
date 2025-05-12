/*
  Warnings:

  - You are about to drop the `_ClassInstructors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseClasses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_InstructorCourses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClassInstructors";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CourseClasses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_InstructorCourses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_StudentClasses";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StudentClass" (
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    PRIMARY KEY ("studentId", "classId"),
    CONSTRAINT "StudentClass_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InstructorClass" (
    "instructorId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    PRIMARY KEY ("instructorId", "classId"),
    CONSTRAINT "InstructorClass_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InstructorClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseClass" (
    "courseId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    PRIMARY KEY ("courseId", "classId"),
    CONSTRAINT "CourseClass_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
