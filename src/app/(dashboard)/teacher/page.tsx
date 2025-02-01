import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async () => {
  const {userId} = await auth();
  return (
    <div className='p-4 flex flex-col xl:flex-row gap-4 flex-1'>
      {/* -- Left Side -- */}
      <div className="w-full xl:w-2/3">
        <div className="h-svh bg-white rounded-md shadow-md gap-8 p-4">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>

      {/* -- Right Side -- */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>        
        <Announcements />
      </div>
    </div>
  )
}

export default TeacherPage;