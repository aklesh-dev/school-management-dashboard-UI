"use client";

import { deleteClass, deleteSubject } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteSubject,
  student: deleteSubject,
  parent: deleteSubject,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
}

// --dynamic import for the optimization of the app (use lazy loading)--
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <p>Loading...</p>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <p>Loading...</p>,
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <p>Loading...</p>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <p>Loading...</p>,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,
  ) => JSX.Element;
} = {
  class: (setOpen, type, data, relatedData) => (
    <ClassForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  // teacher: (setOpen, type, data) => (
  //   <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>
  // ),
  // student: (setOpen, type, data) => (
  //   <StudentForm type={type} data={data} setOpen={setOpen}relatedData={relatedData} />
  // ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & {relatedData?:any}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-izumiYellow"
      : type === "update"
      ? "bg-izumiSky"
      : "bg-izumiPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success:false,
      error: false,
    });

    const router = useRouter();

    useEffect(()=>{
      if(state.success){
        toast.success(`${capitalizeFirstLetter(table)} has been deleted.`,{position:"top-right"});
        setOpen(false);
        router.refresh();  //--> ensure data freshness. triggers a re-fetch of the data for the current route
      }
    },[router, state]);
    
    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name='id' value={id} hidden />
        <h2 className="font-medium text-center">
          All data will be lost. Are you sure you want to delete this {table}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-red-600 text-white p-2 rounded-md">Yes</button>
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-500 text-white p-2 rounded-md"
          >
            No
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  // Helper function to capitalize the first letter of the table name (used for toast delete message)
  const capitalizeFirstLetter = (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
