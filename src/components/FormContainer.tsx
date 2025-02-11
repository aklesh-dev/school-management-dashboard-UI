import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

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


const FormContainer =  async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = {teachers: subjectTeachers};
        break;

      case "class":
        const classGrade = await prisma.grade.findMany({
          select: {id: true, level:true}
        });
        const classTeacher = await prisma.teacher.findMany({
          select: {id: true, name:true, surname:true}
        });
        relatedData = {teachers: classTeacher, grades: classGrade};
        break;
        
      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData} />
    </div>
  );
};

export default FormContainer;
