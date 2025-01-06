"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

// --dynamic import for the optimization of the app--
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <p>Loading...</p>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <p>Loading...</p>,
});


const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
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
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-izumiYellow"
      : type === "update"
      ? "bg-izumiSky"
      : "bg-izumiPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <h2 className="font-medium text-center">All data will be lost. Are you sure you want to delete this {table}</h2>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-red-600 text-white p-2 rounded-md">Yes</button>
          <button onClick={() => setOpen(false)} className="bg-gray-500 text-white p-2 rounded-md">No</button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (      
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="h-screen w-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div className="absolute top-4 right-4 cursor-pointer hover:-translate-x-1 hover:-translate-y-1 transform transition duration-300">
              <Image
                src="/close.png"
                alt=""
                width={14}
                height={14}
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
