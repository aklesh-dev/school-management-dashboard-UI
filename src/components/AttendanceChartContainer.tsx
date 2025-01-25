import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {

  const today = new Date();
  const dayOfWeek = today.getDay();  // --> 0 for Sunday, 1 for Monday, etc. / retrieves the day of the week as a number

  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // calculates the number of days since the last Monday
  
  const lastMonday = new Date(today); //  creates a new Date object that is a copy of today.

  // adjusts the lastMonday Date object to represent the date of the last Monday by subtracting daysSinceMonday from the current date.
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
    const dayOfWeek = itemDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[itemDate.getDay() - 1];  // converts the day of the week number to the corresponding day name.

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

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
      <AttendanceChart data={data as any} />
    </div>
  );
};

export default AttendanceChartContainer;
