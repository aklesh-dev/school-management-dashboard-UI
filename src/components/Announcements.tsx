import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    admin: {},
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <span className="text-gray-400 text-sm">View all</span>
      </div>

      <div className="flex flex-col mt-4 gap-4">
        <div className="bg-izumiSkyLight p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[0].title}</h2>
            <span className="text-gray-400 text-xs bg-white rounded-md p-1">
              {new Intl.DateTimeFormat("en-US").format(data[0].date)}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">{data[0].description}</p>
        </div>
        <div className="bg-izumiPurpleLight p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[1].title}</h2>
            <span className="text-gray-400 text-xs bg-white rounded-md p-1">
              {new Intl.DateTimeFormat("en-US").format(data[1].date)}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">{data[1].description}</p>
        </div>
        <div className="bg-izumiYellowLight p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[2].title}</h2>
            <span className="text-gray-400 text-xs bg-white rounded-md p-1">
              {new Intl.DateTimeFormat("en-US").format(data[2].date)}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">{data[2].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
