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
          prerequisites: course.prerequisites,
        },
      });
    }
    console.log('Courses seeded');

    // Seed Classes
    for (const cls of classes) {
      const instructor = await prisma.instructor.findFirst({ where: { name: cls.instructor } });
      const parentCourse = await prisma.course.findFirst({ where: { courseNo: cls.parentCourse } });

      if (instructor && parentCourse) {
        await prisma.class.create({
          data: {
            classNo: cls.classNo,
            classTime: cls.classTime,
            classDays: cls.classDays,
            status: cls.status,
            noOfStudents: cls.noOfStudents,
            parentCourse: parentCourse.id,
            instructors: {
              connect: { id: instructor.id },
            },
          },
        });
      } else {
        console.log(`Error: Could not find instructor or course for class ${cls.classNo}`);
      }
    }
    console.log('Classes seeded');

    // Seed Students
    for (const student of students) {
      const classConnections = student.classes.map(cls => ({
        classNo: cls.classNo,
      }));

      await prisma.student.create({
        data: {
          username: student.username,
          password: student.password,
          name: student.name,
          classes: {
            connect: classConnections,
          },
        },
      });
    }
    console.log('Students seeded');
    
    console.log('Data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
