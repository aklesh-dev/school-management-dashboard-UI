import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

const CountChartContainer = async () => {

  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((item) => item.sex === "MALE")?._count || 0;
  const girls = data.find((item) => item.sex === "FEMALE")?._count || 0;

  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      {/* -- Title -- */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-xl">Students</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20} />
      </div>

      {/* -- Chart -- */}
      <CountChart boys={boys} girls={girls}/>

      {/* -- Bottom -- */}
      <div className="flex justify-center gap-16  ">
        <div className="flex flex-col gap-1">
          <div className="bg-izumiSky rounded-full w-5 h-5" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-gray-500 text-sm">Boys ({Math.round((boys / (boys + girls)) * 100)}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="bg-izumiYellow rounded-full w-5 h-5" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-gray-500 text-sm">Girls ({Math.round((girls / (boys + girls)) * 100)}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
