import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "student"
    | "teacher"
    | "parent"
    | "result"
    | "lesson"
    | "class"
    | "assignment"
    | "subject"
    | "event"
    | "announcement"
    | "exam";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

type RelatedData = {
  teachers: { id: string; name: string; surname: string }[];
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;

      case "class":
        const classGrade = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeacher = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeacher, grades: classGrade };
        break;

      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;

      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } }, // -- to show empty space in class
        });
        relatedData = { grades: studentGrades, classes: studentClasses };
        break;
        // 
      case "exam":
        // Fetch lessons related to the authenticated user's role and ID, if applicable
        const {userId, sessionClaims} = await auth();
        const role = (sessionClaims?.metadata as {role?: "admin" | "teacher" | "student" | "parent"})?.role;
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === 'teacher' ? {teacherId: userId!} : {}), // Fetch lessons only for the teacher if the user is a teacher
          },
          select: {id: true, name:true}
        });
        relatedData = { lessons: examLessons };
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
