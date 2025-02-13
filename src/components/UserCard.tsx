import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  // Map Object to Prisma Model
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-izumiPurple shadow-lg even:bg-izumiYellow p-4 flex-1 min-w-[130px">
      <div className="flex items-center justify-between">
        <span className="bg-white rounded-full text-[10px] px-2 py-1 text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-gray-500 font-medium text-sm">{type}s</h2>
    </div>
  );
};

export default UserCard;
