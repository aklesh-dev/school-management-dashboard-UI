import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
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
            <CountChart />
          </div>
          {/* --Attendance Chart-- */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>

        {/* --Bottom Chart-- */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* -- Right Side -- */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  )
}

export default AdminPage;