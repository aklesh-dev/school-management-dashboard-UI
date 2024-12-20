import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";

const StudentPage = () => {
  return (
    <div className='p-4 flex flex-col xl:flex-row gap-4'>
      {/* -- Left Side -- */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded-md shadow-md gap-8 p-4">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>

      {/* -- Right Side -- */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  )
}

export default StudentPage;