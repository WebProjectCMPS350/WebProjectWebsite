const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    // Load JSON files
    const students = JSON.parse(fs.readFileSync(path.join(__dirname, '../app/data/students.json')));
    const instructors = JSON.parse(fs.readFileSync(path.join(__dirname, '../app/data/instructors.json')));
    const courses = JSON.parse(fs.readFileSync(path.join(__dirname, '../app/data/courses.json')));
    const classes = JSON.parse(fs.readFileSync(path.join(__dirname, '../app/data/classes.json')));
    const admins = JSON.parse(fs.readFileSync(path.join(__dirname, '../app/data/administrators.json')));

    // Seed Admins
    await prisma.admin.createMany({ data: admins });
    console.log('Admins seeded');

    // Seed Instructors
    for (const instructor of instructors) {
      await prisma.instructor.create({
        data: {
          username: instructor.username,
          password: instructor.password,
          name: instructor.name,
          expArea: instructor.expArea,
        },
      });
    }
    console.log('Instructors seeded');

    // Seed Courses
    for (const course of courses) {
      await prisma.course.create({
        data: {
          courseNo: course.courseNo,
          name: course.name,
          description: course.description,
          category: course.category,
          status: course.status,
        },
      });
    }
    console.log('Courses seeded');

    // Seed Students
    for (const student of students) {
      await prisma.student.create({
        data: {
          username: student.username,
          password: student.password,
          name: student.name,
        },
      });
    }
    console.log('Students seeded');

    // Seed Classes
    for (const cls of classes) {
      await prisma.class.create({
        data: {
          classNo: cls.classNo,
          classTime: cls.classTime,
          classDays: cls.classDays,
          status: cls.status,
          noOfStudents: cls.noOfStudents,
          parentCourse: cls.parentCourse,
        },
      });
    }
    console.log('Classes seeded');

    // Populate Join Tables
    for (const cls of classes) {
      // Link Instructors to Classes
      const instructor = await prisma.instructor.findUnique({
        where: { username: cls.instructor },
      });

      if (instructor) {
        await prisma.instructorClass.create({
          data: {
            instructorId: instructor.id,
            classId: cls.classNo,
          },
        });
        console.log(`Linked Instructor ${instructor.username} to Class ${cls.classNo}`);
      }

      // Link Students to Classes
      for (const student of students) {
        if (student.classes.some(c => c.classNo === cls.classNo)) {
          const dbStudent = await prisma.student.findUnique({
            where: { username: student.username },
          });
          await prisma.studentClass.create({
            data: {
              studentId: dbStudent.id,
              classId: cls.classNo,
            },
          });
          console.log(`Linked Student ${dbStudent.username} to Class ${cls.classNo}`);
        }
      }

      // Link Courses to Classes
      for (const course of courses) {
        if (course.classes.includes(cls.classNo)) {
          const dbCourse = await prisma.course.findUnique({
            where: { courseNo: course.courseNo },
          });
          await prisma.courseClass.create({
            data: {
              courseId: dbCourse.id,
              classId: cls.classNo,
            },
          });
          console.log(`Linked Course ${dbCourse.name} to Class ${cls.classNo}`);
        }
      }
    }
    console.log('All join tables populated');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
