"use client";

import Image from "next/image";

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
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-izumiYellow"
      : type === "update"
      ? "bg-izumiSky"
      : "bg-izumiPurple";
  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
          <Image src={`/${type}.png`} alt="" width={16} height={16} />
        </button>
    </>
  );
};

export default FormModal;
