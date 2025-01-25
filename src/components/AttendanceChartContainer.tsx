import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {

  const today = new Date();
  const dayOfWeek = today.getDay();  // --> 0 for Sunday, 1 for Monday, etc. / returns number of today's day of the week

  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // returns number of days since Monday
  
  const lastMonday = new Date(today); 

  lastMonday.setDate(today.getDate() - daysSinceMonday); // set date to last Monday

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  // console.log(data)

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: {[key: string]: {present: number, absent: number}} = {
    Mon: {present: 0, absent: 0},
    Tue: {present: 0, absent: 0},
    Wed: {present: 0, absent: 0},
    Thu: {present: 0, absent: 0},
    Fri: {present: 0, absent: 0},
  };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];  // returns 

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  })

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Attendance</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20} />
      </div>
      {/* Chart */}
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
