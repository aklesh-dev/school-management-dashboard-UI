"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Totals",
    count: 106,    
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,    
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,    
    fill: "#C3EBFA",
  }, 
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      {/* -- Title -- */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-xl">Students</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20} />
      </div>

      {/* -- Chart -- */}
      <div className="w-full h-[75%] flex justify-center items-center relative">
        <ResponsiveContainer  >
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar              
              // label={{ position: "insideStart", fill: "#fff" }}
              background             
              dataKey="count"
            />
            {/* <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"             
            /> */}
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src={"/maleFemale.png"} alt="maleFemale" width={50} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>

      {/* -- Bottom -- */}
      <div className="flex justify-center gap-16  ">
        <div className="flex flex-col gap-1">
          <div className="bg-izumiSky rounded-full w-5 h-5"/>
          <h1 className="font-bold">1,235</h1>
          <h2 className="text-gray-500 text-sm">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="bg-izumiYellow rounded-full w-5 h-5"/>
          <h1 className="font-bold">1,235</h1>
          <h2 className="text-gray-500 text-sm">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
