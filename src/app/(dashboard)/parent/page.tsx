import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";

const ParentPage = () => {
  return (
    <div className='p-4 flex flex-col xl:flex-row gap-4 flex-1'>
      {/* -- Left Side -- */}
      <div className="w-full xl:w-2/3">
        <div className="h-svh bg-white rounded-md shadow-md gap-8 p-4">
          <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
          <BigCalendar />
        </div>
      </div>

      {/* -- Right Side -- */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>        
        <Announcements />
      </div>
    </div>
  )
}

export default ParentPage;