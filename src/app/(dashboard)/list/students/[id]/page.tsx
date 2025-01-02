import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* --left side-- */}
      <div className="w-full xl:w-2/3">
        {/* --Top-- */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* --user info card-- */}
          <div className="bg-izumiSky py-6 px-4 rounded-md flex-1 flex gap-4">
            {/* --img container-- */}
            <div className="w-1/3">
              <Image
                src={"https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg"}
                alt="avatar"
                height={144}
                width={144}
                className="object-cover rounded-full w-32 h-32 object-center"
              />
            </div>
            {/* --content container-- */}
            <div className="w-2/3 flex flex-col gap-4 justify-between">            
              <h1 className="text-xl font-semibold">Student Name</h1>
              <p className="text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              <div className="flex items-center justify-between gap-2 flex-wrap font-medium text-xs">
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-[45%]">
                  <Image src={"/blood.png"} alt="blood" width={14} height={14} />
                  <span>o+</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-[45%]">
                  <Image src={"/date.png"} alt="date" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-[45%]">
                  <Image src={"/mail.png"} alt="mail" width={14} height={14} />
                  <span>user@mail.com</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-[45%]">
                  <Image src={"/phone.png"} alt="phone" width={14} height={14} />
                  <span>9825416484</span>
                </div>
              </div>
            </div>
          </div>

          {/* --small cards-- */}
          <div className="flex-1 flex gap-4 flex-wrap justify-between">
            {/* --card-- */}
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] ">
              <Image src={'/singleAttendance.png'} alt="" width={44} height={44} />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-500">Attandance</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] ">
              <Image src={'/singleBranch.png'} alt="" width={44} height={44} />
              <div className="">
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-500">Grade</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] ">
              <Image src={'/singleClass.png'} alt="" width={44} height={44} />
              <div className="">
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-500">Class</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] ">
              <Image src={'/singleLesson.png'} alt="" width={44} height={44} />
              <div className="">
                <h1 className="text-xl font-semibold">16</h1>
                <span className="text-sm text-gray-500">Lesson</span>
              </div>
            </div>
          </div>
        </div>

        {/* --Bottom-- */}
        <div className="bg-white mt-4 rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar/>
        </div>
      </div>

      {/* --right side-- */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-500">
            <Link className="p-3 rounded-md bg-izumiSky" href={"/"}>Student&apos;s Lessons</Link>
            <Link className="p-3 rounded-md bg-izumiPurple" href={`/list/teachers?classId=${2}`}>Student&apos;s Teachers</Link>
            <Link className="p-3 rounded-md bg-izumiYellow" href={"/"}>Student&apos;s Exams</Link>
            <Link className="p-3 rounded-md bg-izumiPurpleLight" href={"/"}>Student&apos;s Results</Link>
            <Link className="p-3 rounded-md bg-izumiSkyLight" href={"/"}>Student&apos;s Assignments</Link>
          </div>
        </div>

        <Performance/>
        <Announcements/>
      </div>
    </div>
  );
};

export default SingleStudentPage;
