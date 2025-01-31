import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className='p-4 flex flex-col gap-4 md:flex-row'>
      {/* -- Left Side -- */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
          {/* --User Card-- */}
        <div className="flex flex-wrap gap-4 justify-between">
          <UserCard type={"admin"} />
          <UserCard type={"student"} />
          <UserCard type={"parent"} />
          <UserCard type={"teacher"} />
        </div>

        {/* --Middle Chart-- */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* --Count Chart-- */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* --Attendance Chart-- */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>

        {/* --Bottom Chart-- */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* -- Right Side -- */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  )
}

export default AdminPage;