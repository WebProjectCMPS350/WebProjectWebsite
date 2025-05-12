/*
  Warnings:

  - You are about to drop the `_ClassToCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToInstructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToInstructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `instructorId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `classes` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noOfStudents` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentCourse` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ClassToCourse_B_index";

-- DropIndex
DROP INDEX "_ClassToCourse_AB_unique";

-- DropIndex
DROP INDEX "_ClassToInstructor_B_index";

-- DropIndex
DROP INDEX "_ClassToInstructor_AB_unique";

-- DropIndex
DROP INDEX "_ClassToStudent_B_index";

-- DropIndex
DROP INDEX "_ClassToStudent_AB_unique";

-- DropIndex
DROP INDEX "_CourseToInstructor_B_index";

-- DropIndex
DROP INDEX "_CourseToInstructor_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClassToCourse";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClassToInstructor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClassToStudent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CourseToInstructor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_StudentClasses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClassInstructors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ClassInstructors_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassInstructors_B_fkey" FOREIGN KEY ("B") REFERENCES "Instructor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CourseClasses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CourseClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_InstructorCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_InstructorCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InstructorCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Instructor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classNo" INTEGER NOT NULL,
    "classTime" TEXT NOT NULL,
    "classDays" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "noOfStudents" INTEGER NOT NULL,
    "parentCourse" INTEGER NOT NULL
);
INSERT INTO "new_Class" ("classDays", "classNo", "classTime", "id", "status") SELECT "classDays", "classNo", "classTime", "id", "status" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_classNo_key" ON "Class"("classNo");
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseNo" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "prerequisites" JSONB NOT NULL
);
INSERT INTO "new_Course" ("category", "courseNo", "description", "id", "name", "prerequisites", "status") SELECT "category", "courseNo", "description", "id", "name", "prerequisites", "status" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_courseNo_key" ON "Course"("courseNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_StudentClasses_AB_unique" ON "_StudentClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentClasses_B_index" ON "_StudentClasses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassInstructors_AB_unique" ON "_ClassInstructors"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassInstructors_B_index" ON "_ClassInstructors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseClasses_AB_unique" ON "_CourseClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseClasses_B_index" ON "_CourseClasses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InstructorCourses_AB_unique" ON "_InstructorCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_InstructorCourses_B_index" ON "_InstructorCourses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_username_key" ON "Instructor"("username");
